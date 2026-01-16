/**
 * PocketBase Client Configuration
 * 
 * Uses environment variable for the PocketBase URL.
 * In development: http://127.0.0.1:8090
 * In production: Your Zo Computer URL
 */

import PocketBase from 'pocketbase';

// Create PocketBase client instance
const pb = new PocketBase(
    process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090'
);

// Disable auto-cancellation for survey submissions
// (we want to ensure data is saved even if user navigates away)
pb.autoCancellation(false);

export default pb;

// Type definitions for our collections
export interface ParticipantRecord {
    id?: string;
    name: string;
    email?: string;
    segment: string;
    has_written_specs: string;
    vibe_coding_experience: string;
    consent_given: boolean;
    consent_timestamp: string;
    open_to_followup: boolean;
    created?: string;
    updated?: string;
}

export interface SessionRecord {
    id?: string;
    participant: string; // relation ID
    stimulus: string;
    stimulus_familiarity: string;
    started_at: string;
    completed_at?: string;
    duration_seconds?: number;
    created?: string;
    updated?: string;
}

export interface IntentResponseRecord {
    id?: string;
    session: string; // relation ID
    raw_text: string;
    word_count: number;
    time_spent_seconds: number;
    hint_expanded: boolean;
    submitted_at: string;
    created?: string;
    updated?: string;
}

export interface SessionFeedbackRecord {
    id?: string;
    session: string; // relation ID
    difficulty_rating: number;
    felt_vocabulary_gap: string;
    vocabulary_gap_details?: string;
    open_feedback?: string;
    submitted_at: string;
    created?: string;
    updated?: string;
}
