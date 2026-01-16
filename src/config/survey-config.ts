/**
 * Survey Configuration System
 * 
 * Defines types and utilities for configurable, extensible surveys.
 * Each survey is defined declaratively and loaded dynamically.
 */

// Screen configuration for conditional rendering
export interface ScreenConfig {
    id: string;                              // Unique screen identifier
    component: string;                       // Component name to render
    required?: boolean;                      // Whether screen can be skipped (default: true)
    condition?: (formData: Record<string, unknown>) => boolean;  // When to show this screen
}

// Stimulus configuration (e.g., todo_app, booking_system)
export interface StimulusConfig {
    id: string;                              // 'todo_app', 'booking_system'
    name: string;                            // Display name
    description: string;                     // Scenario description shown to user
    familiarityQuestion: string;             // Question about familiarity
}

// Feature flags for optional survey features
export interface SurveyFeatures {
    clarifyingQuestions: boolean;            // Phase 1: Show clarifying questions
    cardSort: boolean;                       // Phase 2: Include card sort exercise
}

// Complete survey configuration
export interface SurveyConfig {
    id: string;                              // Unique survey identifier
    name: string;                            // Human-readable name
    version: string;                         // Semantic version
    description: string;                     // Research purpose
    stimuli: StimulusConfig[];               // Available stimuli
    defaultStimulus: string;                 // Default stimulus ID
    screens: ScreenConfig[];                 // Ordered screen sequence
    features: SurveyFeatures;                // Enabled features
    copy: SurveyCopy;                        // UI text/copy
}

// Copy/text for survey screens
export interface SurveyCopy {
    welcome: {
        title: string;
        description: string;
        consent: string;
    };
    intake: {
        title: string;
    };
    stimulus: {
        title: string;
        description: string;
        familiarityQuestion: string;
    };
    intentCapture: {
        title: string;
        subtitle: string;
        placeholder: string;
    };
    clarifyingQuestions?: {
        title: string;
        subtitle: string;
        skipLabel: string;
    };
    reflection: {
        title: string;
        subtitle: string;
    };
    thankYou: {
        title: string;
        message: string;
        followUp: string;
    };
}

// Registry of available surveys
const surveyRegistry: Map<string, SurveyConfig> = new Map();

/**
 * Register a survey configuration
 */
export function registerSurvey(config: SurveyConfig): void {
    surveyRegistry.set(config.id, config);
}

/**
 * Get a survey configuration by ID
 */
export function getSurvey(id: string): SurveyConfig | undefined {
    return surveyRegistry.get(id);
}

/**
 * Get all registered survey IDs
 */
export function getRegisteredSurveys(): string[] {
    return Array.from(surveyRegistry.keys());
}

/**
 * Get the default survey (first registered, or specified)
 */
export function getDefaultSurvey(): SurveyConfig | undefined {
    const entries = Array.from(surveyRegistry.values());
    return entries[0];
}

// Screen name constants for reference
export const SCREEN_IDS = {
    WELCOME: 'welcome',
    INTAKE: 'intake',
    STIMULUS: 'stimulus',
    INTENT_CAPTURE: 'intent-capture',
    CLARIFYING_QUESTIONS: 'clarifying-questions',
    REFLECTION: 'reflection',
    THANK_YOU: 'thank-you',
} as const;

export type ScreenId = typeof SCREEN_IDS[keyof typeof SCREEN_IDS];
