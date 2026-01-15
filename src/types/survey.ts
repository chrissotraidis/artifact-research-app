// Survey form data structure - matches the research data model
export interface SurveyFormData {
    // Consent
    consent: boolean;

    // Intake
    firstName: string;
    segment: Segment | '';
    has_written_specs: SpecExperience | '';
    vibe_coding_experience: VibeCodingExperience | '';

    // Stimulus (Todo App MVP)
    stimulus: 'todo_app';
    stimulus_familiarity: StimulusFamiliarity | '';

    // Intent Capture
    intentDescription: string;
    hint_expanded: boolean;

    // Reflection
    difficultyRating: number | null;
    vocabGap: VocabGapResponse | '';
    difficultyDescription: string;
    otherThoughts: string;
    followUpInterest: YesNo | '';
    email: string;
}

// Segment options
export type Segment =
    | 'Technical-adjacent'
    | 'Non-technical'
    | 'Engineer'
    | 'Other';

// Spec writing experience
export type SpecExperience =
    | 'Regularly'
    | 'Occasionally'
    | 'Rarely / Never';

// Vibe coding experience options
export type VibeCodingExperience =
    | 'Extensive'
    | 'Little'
    | 'KnowNotUsed'
    | 'DontKnow';

// Stimulus familiarity options
export type StimulusFamiliarity =
    | 'Very familiar (I use one regularly)'
    | 'Somewhat familiar'
    | 'Not very familiar';

// Yes/No responses
export type YesNo = 'Yes' | 'No';

// Vocab gap response
export type VocabGapResponse = 'Yes' | 'No' | 'Unsure';

// Survey step indices
export type SurveyStep = 0 | 1 | 2 | 3 | 4 | 5;

// Initial form state
export const initialFormData: SurveyFormData = {
    consent: false,
    firstName: '',
    segment: '',
    has_written_specs: '',
    vibe_coding_experience: '',
    stimulus: 'todo_app',
    stimulus_familiarity: '',
    intentDescription: '',
    hint_expanded: false,
    difficultyRating: null,
    vocabGap: '',
    difficultyDescription: '',
    otherThoughts: '',
    followUpInterest: '',
    email: '',
};
