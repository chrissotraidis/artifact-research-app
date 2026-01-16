/**
 * Survey Registry Index
 * 
 * Import and re-export all survey configurations.
 * This ensures all surveys are registered when the app loads.
 */

// Import surveys to trigger registration
import './document-structure-ia';

// Re-export config utilities
export {
    getSurvey,
    getDefaultSurvey,
    getRegisteredSurveys,
    SCREEN_IDS,
} from '../survey-config';

export type {
    SurveyConfig,
    ScreenConfig,
    StimulusConfig,
    SurveyFeatures,
    SurveyCopy,
    ScreenId,
} from '../survey-config';
