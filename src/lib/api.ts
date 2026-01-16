/**
 * API Abstraction Layer for Survey Data
 * 
 * Provides functions to interact with PocketBase collections.
 * This layer abstracts the database operations, making it easy
 * to switch backends if needed.
 */

import pb, {
    ParticipantRecord,
    SessionRecord,
    IntentResponseRecord,
    SessionFeedbackRecord,
    ClarifyingResponseRecord,
} from './pocketbase';
import { surveyLogger, analyticsLogger } from './logger';
import { SurveyFormData, SurveyStep } from '@/types/survey';

// Collection names
const COLLECTIONS = {
    PARTICIPANTS: 'participants',
    SESSIONS: 'sessions',
    INTENT_RESPONSES: 'intent_responses',
    CLARIFYING_RESPONSES: 'clarifying_responses',
    SESSION_FEEDBACK: 'session_feedback',
} as const;

/**
 * Check if PocketBase is available
 */
export async function checkConnection(): Promise<boolean> {
    try {
        await pb.health.check();
        surveyLogger.info('PocketBase connection OK');
        return true;
    } catch (error) {
        surveyLogger.warn('PocketBase not available', { error: String(error) });
        return false;
    }
}

/**
 * Create a participant record
 */
export async function createParticipant(
    data: Omit<ParticipantRecord, 'id' | 'created' | 'updated'>
): Promise<ParticipantRecord> {
    surveyLogger.info('Creating participant record');

    const record = await pb.collection(COLLECTIONS.PARTICIPANTS).create<ParticipantRecord>(data);

    surveyLogger.info('Participant created', { id: record.id });
    return record;
}

/**
 * Create a session record
 */
export async function createSession(
    data: Omit<SessionRecord, 'id' | 'created' | 'updated'>
): Promise<SessionRecord> {
    surveyLogger.info('Creating session record', { data });

    try {
        const record = await pb.collection(COLLECTIONS.SESSIONS).create<SessionRecord>(data);
        surveyLogger.info('Session created', { id: record.id });
        return record;
    } catch (error: unknown) {
        // Log detailed PocketBase error
        const pbError = error as { data?: Record<string, unknown>; message?: string };
        surveyLogger.error('Session creation failed', {
            data,
            errorMessage: pbError.message,
            errorData: pbError.data,
        });
        throw error;
    }
}

/**
 * Update a session record (e.g., to mark as completed)
 */
export async function updateSession(
    id: string,
    data: Partial<SessionRecord>
): Promise<SessionRecord> {
    const record = await pb.collection(COLLECTIONS.SESSIONS).update<SessionRecord>(id, data);
    surveyLogger.info('Session updated', { id: record.id });
    return record;
}

/**
 * Create an intent response record
 */
export async function createIntentResponse(
    data: Omit<IntentResponseRecord, 'id' | 'created' | 'updated'>
): Promise<IntentResponseRecord> {
    surveyLogger.info('Creating intent response record');

    const record = await pb.collection(COLLECTIONS.INTENT_RESPONSES).create<IntentResponseRecord>(data);

    surveyLogger.info('Intent response saved', { id: record.id, wordCount: data.word_count });
    return record;
}

/**
 * Create session feedback record
 */
export async function createSessionFeedback(
    data: Omit<SessionFeedbackRecord, 'id' | 'created' | 'updated'>
): Promise<SessionFeedbackRecord> {
    surveyLogger.info('Creating session feedback record');

    const record = await pb.collection(COLLECTIONS.SESSION_FEEDBACK).create<SessionFeedbackRecord>(data);

    surveyLogger.info('Session feedback saved', { id: record.id });
    return record;
}

/**
 * Create clarifying responses record (Phase 1)
 */
export async function createClarifyingResponse(
    data: Omit<ClarifyingResponseRecord, 'id' | 'created' | 'updated'>
): Promise<ClarifyingResponseRecord> {
    surveyLogger.info('Creating clarifying response record');

    const record = await pb.collection(COLLECTIONS.CLARIFYING_RESPONSES).create<ClarifyingResponseRecord>(data);

    surveyLogger.info('Clarifying response saved', { id: record.id, skipped: data.skipped });
    return record;
}

/**
 * Submit the complete survey
 * Orchestrates creating all records in the correct order
 */
export async function submitSurvey(
    formData: SurveyFormData,
    screenTimes: Record<SurveyStep, number>,
    sessionDuration: number
): Promise<{ success: boolean; participantId?: string; sessionId?: string; error?: string }> {
    const startTime = Date.now();

    try {
        // Check if PocketBase is available
        const isConnected = await checkConnection();
        if (!isConnected) {
            surveyLogger.warn('PocketBase unavailable - logging data only');
            // Log the data for later recovery
            analyticsLogger.info('Survey data (offline)', {
                formData,
                screenTimes,
                sessionDuration,
                timestamp: new Date().toISOString(),
            });
            return {
                success: false,
                error: 'Database unavailable. Data has been logged for recovery.'
            };
        }

        // 1. Create participant
        const participant = await createParticipant({
            name: formData.firstName,
            email: formData.email || undefined,
            segment: formData.segment || 'unknown',
            has_written_specs: formData.has_written_specs || 'unknown',
            vibe_coding_experience: formData.vibe_coding_experience || 'unknown',
            consent_given: formData.consent,
            consent_timestamp: new Date().toISOString(),
            open_to_followup: formData.followUpInterest === 'Yes',
        });

        // 2. Create session
        const session = await createSession({
            participant: participant.id!,
            stimulus: formData.stimulus,
            stimulus_familiarity: formData.stimulus_familiarity || 'unknown',
            started_at: new Date(Date.now() - (sessionDuration * 1000)).toISOString(),
            completed_at: new Date().toISOString(),
            duration_seconds: sessionDuration,
        });

        // 3. Create intent response
        const wordCount = formData.intentDescription.trim().split(/\s+/).filter(Boolean).length;
        await createIntentResponse({
            session: session.id!,
            raw_text: formData.intentDescription,
            word_count: wordCount,
            time_spent_seconds: screenTimes[3] || 0, // IntentCapture screen
            hint_expanded: formData.hint_expanded,
            submitted_at: new Date().toISOString(),
        });

        // 4. Create clarifying response (Phase 1) - only if there were questions shown
        const questionsShown = formData.clarifyingQuestionsShown || Object.keys(formData.clarifyingResponses);
        if (questionsShown.length > 0 || formData.clarifyingSkipped) {
            await createClarifyingResponse({
                session: session.id!,
                questions_shown: JSON.stringify(questionsShown),
                responses: JSON.stringify(formData.clarifyingResponses),
                skipped: formData.clarifyingSkipped,
                submitted_at: new Date().toISOString(),
            });
        }

        // 5. Create session feedback
        await createSessionFeedback({
            session: session.id!,
            difficulty_rating: formData.difficultyRating || 0,
            felt_vocabulary_gap: formData.vocabGap || 'unknown',
            vocabulary_gap_details: formData.difficultyDescription || undefined,
            open_feedback: formData.otherThoughts || undefined,
            submitted_at: new Date().toISOString(),
        });

        const elapsed = Date.now() - startTime;
        analyticsLogger.info('Survey submitted successfully', {
            participantId: participant.id,
            sessionId: session.id,
            duration_ms: elapsed,
            wordCount,
        });

        return {
            success: true,
            participantId: participant.id,
            sessionId: session.id,
        };

    } catch (error) {
        surveyLogger.error('Survey submission failed', { error: String(error) });

        // Log the data for recovery even on failure
        analyticsLogger.error('Failed submission data', {
            formData,
            screenTimes,
            sessionDuration,
            error: String(error),
            timestamp: new Date().toISOString(),
        });

        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
        };
    }
}
