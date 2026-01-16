// Question options and copy for the survey
// Extracted from surveysite.html for reusability

export const SEGMENT_OPTIONS = [
    { value: 'Technical-adjacent', label: 'Technical-adjacent (PM, BA, Designer)' },
    { value: 'Non-technical', label: 'Non-technical (Business owner, Creator)' },
    { value: 'Engineer', label: 'Software Engineer / Developer' },
    { value: 'Other', label: 'Other' },
] as const;

export const SPEC_EXPERIENCE_OPTIONS = [
    'Regularly',
    'Occasionally',
    'Rarely / Never',
] as const;

export const VIBE_CODING_OPTIONS = [
    { value: 'Extensive', label: 'Extensive experience' },
    { value: 'Little', label: 'Tried it a little' },
    { value: 'KnowNotUsed', label: "Know of them, haven't used" },
    { value: 'DontKnow', label: "Don't know what this is" },
] as const;

export const STIMULUS_FAMILIARITY_OPTIONS = [
    'Very familiar (I use one regularly)',
    'Somewhat familiar',
    'Not very familiar',
] as const;

export const VOCAB_GAP_OPTIONS = ['Yes', 'No', 'Unsure'] as const;

export const HINTS = [
    'What would someone do with this app?',
    'What information would it need to track?',
    'How would it look or feel to use?',
] as const;

// Copy constants
export const COPY = {
    welcome: {
        title: 'Help us understand how people naturally describe software',
        description: "We're researching how different people think about and describe applications. This will take 10-15 minutes. Your responses help us build better tools.",
        consent: 'I understand my responses will be used for research purposes and may be anonymized and shared.',
    },
    intake: {
        title: 'Tell us a bit about yourself',
    },
    stimulus: {
        title: 'Scenario: A Better Todo App',
        description: 'Imagine you want to build a simple Todo App — one that actually works the way you think. Don\'t worry about technical details or how other apps work. Just describe what you\'d want it to do for you.',
        familiarityQuestion: 'How familiar are you with todo apps?',
    },
    intentCapture: {
        title: 'Describe the app you wish existed',
        subtitle: "Write as much or as little as you want. There's no right or wrong answer.",
        placeholder: 'Start describing your todo app idea here...',
    },
    reflection: {
        title: 'Almost done',
        subtitle: 'A few quick reflections on your thought process.',
    },
    thankYou: {
        title: 'Thank you!',
        message: 'Your responses have been saved. We really appreciate you taking the time to help us research this.',
        followUp: "We'll reach out soon if you opted for a follow-up.",
    },
} as const;

export const TOTAL_STEPS = 7;
