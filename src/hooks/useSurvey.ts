'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { SurveyFormData, SurveyStep, initialFormData } from '@/types/survey';
import { TOTAL_STEPS } from '@/constants/survey';
import { surveyLogger, navigationLogger, formLogger, analyticsLogger } from '@/lib/logger';

interface UseSurveyReturn {
    // State
    formData: SurveyFormData;
    step: SurveyStep;
    isSubmitting: boolean;
    progress: number;

    // Actions
    updateField: <K extends keyof SurveyFormData>(field: K, value: SurveyFormData[K]) => void;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: SurveyStep) => void;
    submit: () => Promise<void>;

    // Timing
    sessionStartTime: number | null;
    getSessionDuration: () => number;
    screenTimes: Record<SurveyStep, number>;
}

// Screen names for logging
const SCREEN_NAMES: Record<SurveyStep, string> = {
    0: 'Welcome',
    1: 'Intake',
    2: 'Stimulus',
    3: 'IntentCapture',
    4: 'Reflection',
    5: 'ThankYou',
};

// LocalStorage key for persistence
const STORAGE_KEY = 'artifact-survey-state';

// Load saved state from localStorage
function loadSavedState(): Partial<{ formData: SurveyFormData; step: SurveyStep }> | null {
    if (typeof window === 'undefined') return null;
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            surveyLogger.info('Restored saved state', { step: parsed.step });
            return parsed;
        }
    } catch (e) {
        surveyLogger.warn('Failed to load saved state', { error: String(e) });
    }
    return null;
}

// Save state to localStorage
function saveState(formData: SurveyFormData, step: SurveyStep) {
    if (typeof window === 'undefined') return;
    try {
        // Don't save if on Thank You screen (completed)
        if (step >= TOTAL_STEPS - 1) {
            localStorage.removeItem(STORAGE_KEY);
            return;
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ formData, step }));
    } catch (e) {
        surveyLogger.warn('Failed to save state', { error: String(e) });
    }
}

export function useSurvey(): UseSurveyReturn {
    const [formData, setFormData] = useState<SurveyFormData>(initialFormData);
    const [step, setStep] = useState<SurveyStep>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
    const [screenTimes, setScreenTimes] = useState<Record<SurveyStep, number>>({
        0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0
    });
    const [isHydrated, setIsHydrated] = useState(false);

    // Track when user entered current screen
    const screenEntryTime = useRef<number>(Date.now());

    // Hydrate from localStorage on mount
    useEffect(() => {
        const saved = loadSavedState();
        if (saved) {
            if (saved.formData) setFormData(saved.formData);
            if (saved.step !== undefined && saved.step < TOTAL_STEPS - 1) {
                setStep(saved.step);
            }
        }
        setIsHydrated(true);
        surveyLogger.info('Survey initialized', {
            initialStep: SCREEN_NAMES[saved?.step || 0],
            restored: !!saved,
            timestamp: new Date().toISOString()
        });
    }, []);

    // Save state on changes (after hydration)
    useEffect(() => {
        if (isHydrated) {
            saveState(formData, step);
        }
    }, [formData, step, isHydrated]);

    // Track time on each screen
    useEffect(() => {
        screenEntryTime.current = Date.now();

        return () => {
            const timeSpent = Math.floor((Date.now() - screenEntryTime.current) / 1000);
            setScreenTimes(prev => ({
                ...prev,
                [step]: prev[step] + timeSpent
            }));
        };
    }, [step]);

    // Calculate progress (0-100)
    const progress = Math.min(((step + 1) / TOTAL_STEPS) * 100, 100);

    // Update a single form field
    const updateField = useCallback(<K extends keyof SurveyFormData>(
        field: K,
        value: SurveyFormData[K]
    ) => {
        formLogger.debug(`Field updated: ${field}`, { field, value });
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    // Navigation
    const nextStep = useCallback(() => {
        const currentScreen = SCREEN_NAMES[step];
        const nextScreen = SCREEN_NAMES[Math.min(step + 1, TOTAL_STEPS - 1) as SurveyStep];
        const timeOnScreen = Math.floor((Date.now() - screenEntryTime.current) / 1000);

        // Start session timer after consent
        if (step === 0 && !sessionStartTime) {
            const startTime = Date.now();
            setSessionStartTime(startTime);
            analyticsLogger.info('Session started', {
                startTime: new Date(startTime).toISOString()
            });
        }

        navigationLogger.info(`Navigate: ${currentScreen} → ${nextScreen}`, {
            from: step,
            to: Math.min(step + 1, TOTAL_STEPS - 1),
            progress: `${Math.round(progress)}%`,
            timeOnScreen: `${timeOnScreen}s`,
        });

        // Update screen times before navigating
        setScreenTimes(prev => ({
            ...prev,
            [step]: prev[step] + timeOnScreen
        }));

        setStep(prev => Math.min(prev + 1, TOTAL_STEPS - 1) as SurveyStep);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step, sessionStartTime, progress]);

    const prevStep = useCallback(() => {
        const currentScreen = SCREEN_NAMES[step];
        const prevScreen = SCREEN_NAMES[Math.max(step - 1, 0) as SurveyStep];
        const timeOnScreen = Math.floor((Date.now() - screenEntryTime.current) / 1000);

        navigationLogger.info(`Navigate back: ${currentScreen} → ${prevScreen}`, {
            from: step,
            to: Math.max(step - 1, 0),
            timeOnScreen: `${timeOnScreen}s`,
        });

        // Update screen times before navigating
        setScreenTimes(prev => ({
            ...prev,
            [step]: prev[step] + timeOnScreen
        }));

        setStep(prev => Math.max(prev - 1, 0) as SurveyStep);
    }, [step]);

    const goToStep = useCallback((targetStep: SurveyStep) => {
        const targetScreen = SCREEN_NAMES[targetStep];
        navigationLogger.info(`Direct navigation to ${targetScreen}`, { targetStep });
        setStep(targetStep);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Get session duration in seconds
    const getSessionDuration = useCallback(() => {
        if (!sessionStartTime) return 0;
        return Math.floor((Date.now() - sessionStartTime) / 1000);
    }, [sessionStartTime]);

    // Submit survey data
    const submit = useCallback(async () => {
        surveyLogger.info('Submission started');
        setIsSubmitting(true);

        try {
            const duration = getSessionDuration();
            const timeOnReflection = Math.floor((Date.now() - screenEntryTime.current) / 1000);

            // Final screen times
            const finalScreenTimes = {
                ...screenTimes,
                [step]: screenTimes[step] + timeOnReflection
            };

            // Import API dynamically to avoid SSR issues
            const { submitSurvey } = await import('@/lib/api');

            // Submit to PocketBase
            const result = await submitSurvey(formData, finalScreenTimes, duration);

            if (result.success) {
                surveyLogger.info('Submission successful', {
                    participantId: result.participantId,
                    sessionId: result.sessionId
                });
            } else {
                surveyLogger.warn('Submission to database failed, but continuing', {
                    error: result.error
                });
                // Still proceed - data was logged for recovery
            }

            analyticsLogger.info('Session completed', {
                duration_seconds: duration,
                word_count: formData.intentDescription.trim().split(/\s+/).filter(Boolean).length,
                hint_expanded: formData.hint_expanded,
                segment: formData.segment,
                followup_interest: formData.followUpInterest,
                screen_times: finalScreenTimes,
                db_success: result.success,
            });

            // Clear saved state on successful submission
            if (typeof window !== 'undefined') {
                localStorage.removeItem(STORAGE_KEY);
            }

            // Go to thank you screen
            nextStep();
        } catch (error) {
            surveyLogger.error('Submission failed', { error: String(error) });
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, getSessionDuration, nextStep, screenTimes, step]);

    return {
        formData,
        step,
        isSubmitting,
        progress,
        updateField,
        nextStep,
        prevStep,
        goToStep,
        submit,
        sessionStartTime,
        getSessionDuration,
        screenTimes,
    };
}
