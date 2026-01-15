'use client';

import { useSurvey } from '@/hooks/useSurvey';
import { ProgressBar, SurveyLayout } from '@/components/survey';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import {
  WelcomeScreen,
  IntakeScreen,
  StimulusScreen,
  IntentCaptureScreen,
  ReflectionScreen,
  ThankYouScreen,
} from '@/components/screens';
import { TOTAL_STEPS } from '@/constants/survey';
import {
  Segment,
  SpecExperience,
  VibeCodingExperience,
  StimulusFamiliarity,
  VocabGapResponse,
  YesNo
} from '@/types/survey';

export default function SurveyPage() {
  const survey = useSurvey();
  const { step, progress, formData, updateField, nextStep, prevStep, isSubmitting, submit } = survey;

  const renderScreen = () => {
    switch (step) {
      case 0:
        return (
          <WelcomeScreen
            consent={formData.consent}
            onConsentChange={(value) => updateField('consent', value)}
            onContinue={nextStep}
          />
        );

      case 1:
        return (
          <IntakeScreen
            firstName={formData.firstName}
            segment={formData.segment}
            hasWrittenSpecs={formData.has_written_specs}
            vibeCodingExperience={formData.vibe_coding_experience}
            onFirstNameChange={(value) => updateField('firstName', value)}
            onSegmentChange={(value: Segment) => updateField('segment', value)}
            onSpecExperienceChange={(value: SpecExperience) => updateField('has_written_specs', value)}
            onVibeCodingChange={(value: VibeCodingExperience) => updateField('vibe_coding_experience', value)}
            onContinue={nextStep}
          />
        );

      case 2:
        return (
          <StimulusScreen
            familiarity={formData.stimulus_familiarity}
            onFamiliarityChange={(value: StimulusFamiliarity) => updateField('stimulus_familiarity', value)}
            onContinue={nextStep}
          />
        );

      case 3:
        return (
          <IntentCaptureScreen
            description={formData.intentDescription}
            onDescriptionChange={(value) => updateField('intentDescription', value)}
            onHintExpanded={() => updateField('hint_expanded', true)}
            onContinue={nextStep}
          />
        );

      case 4:
        return (
          <ReflectionScreen
            difficultyRating={formData.difficultyRating}
            vocabGap={formData.vocabGap}
            difficultyDescription={formData.difficultyDescription}
            otherThoughts={formData.otherThoughts}
            followUpInterest={formData.followUpInterest}
            email={formData.email}
            isSubmitting={isSubmitting}
            onDifficultyChange={(value) => updateField('difficultyRating', value)}
            onVocabGapChange={(value: VocabGapResponse) => updateField('vocabGap', value)}
            onDifficultyDescriptionChange={(value) => updateField('difficultyDescription', value)}
            onOtherThoughtsChange={(value) => updateField('otherThoughts', value)}
            onFollowUpChange={(value: YesNo) => updateField('followUpInterest', value)}
            onEmailChange={(value) => updateField('email', value)}
            onSubmit={submit}
          />
        );

      case 5:
        return <ThankYouScreen />;

      default:
        return null;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#0D0D0D] text-[#FAFAFA] selection:bg-[#E0FF4F] selection:text-[#0D0D0D]">
        {/* Progress Bar (hide on Thank You screen) */}
        {step < TOTAL_STEPS - 1 && <ProgressBar progress={progress} />}

        <SurveyLayout
          step={step}
          totalSteps={TOTAL_STEPS}
          onBack={prevStep}
          showNav={true}
        >
          {renderScreen()}
        </SurveyLayout>
      </div>
    </ErrorBoundary>
  );
}
