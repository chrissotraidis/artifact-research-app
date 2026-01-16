/**
 * Document Structure & IA Research Survey Configuration
 * 
 * This is the primary research survey for studying how different user
 * segments naturally structure and organize application documentation.
 */

import { SurveyConfig, SCREEN_IDS, registerSurvey } from '../survey-config';

export const documentStructureIASurvey: SurveyConfig = {
    id: 'document-structure-ia',
    name: 'Document Structure & IA Research',
    version: '1.1.0',
    description: 'Research how different user segments naturally structure and organize application documentation.',

    stimuli: [
        {
            id: 'todo_app',
            name: 'Todo App',
            description: 'Imagine you want to build a simple Todo App — one that actually works the way you think. Don\'t worry about technical details or how other apps work. Just describe what you\'d want it to do for you.',
            familiarityQuestion: 'How familiar are you with todo apps?',
        },
        // Phase 2: Add booking_system stimulus here
    ],

    defaultStimulus: 'todo_app',

    screens: [
        { id: SCREEN_IDS.WELCOME, component: 'WelcomeScreen' },
        { id: SCREEN_IDS.INTAKE, component: 'IntakeScreen' },
        { id: SCREEN_IDS.STIMULUS, component: 'StimulusScreen' },
        { id: SCREEN_IDS.INTENT_CAPTURE, component: 'IntentCaptureScreen' },
        {
            id: SCREEN_IDS.CLARIFYING_QUESTIONS,
            component: 'ClarifyingQuestionsScreen',
            required: false,
            // Only show if clarifying questions feature is enabled
            condition: () => {
                // Will be evaluated at runtime based on features flag
                return true;
            }
        },
        { id: SCREEN_IDS.REFLECTION, component: 'ReflectionScreen' },
        { id: SCREEN_IDS.THANK_YOU, component: 'ThankYouScreen' },
    ],

    features: {
        clarifyingQuestions: true,  // Phase 1 enabled
        cardSort: false,             // Phase 2 disabled for now
    },

    copy: {
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
        clarifyingQuestions: {
            title: 'A few follow-up questions',
            subtitle: 'Based on your description, we have a few clarifying questions. These are optional.',
            skipLabel: 'Skip this section',
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
    },
};

// Register this survey on module load
registerSurvey(documentStructureIASurvey);

export default documentStructureIASurvey;
