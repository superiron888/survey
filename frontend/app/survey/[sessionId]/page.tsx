'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { INVESTMENT_SURVEY } from '@/config/survey';
import QuestionCard from '@/components/survey/QuestionCard';
import ProgressBar from '@/components/survey/ProgressBar';
import { api } from '@/services/api';

export default function SurveyPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [submitting, setSubmitting] = useState(false);

  const currentQuestion = INVESTMENT_SURVEY.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / INVESTMENT_SURVEY.questions.length) * 100;

  // Save answer
  const handleAnswer = async (questionId: number, answer: any) => {
    // Update local state
    setAnswers(prev => ({ ...prev, [questionId]: answer }));

    // Auto-save to server
    try {
      const userId = localStorage.getItem('userId');
      if (userId) {
        await api.saveAnswer({
          userId,
          sessionId,
          questionId,
          answer
        });
      }
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  // Next question
  const handleNext = () => {
    if (currentQuestionIndex < INVESTMENT_SURVEY.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Submit survey
  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        router.push('/');
        return;
      }

      await api.submitSurvey(userId, sessionId);
      // Navigate to report page
      router.push(`/report/${sessionId}`);
    } catch (error) {
      console.error('Submit failed:', error);
      alert('Submit failed, please try again');
      setSubmitting(false);
    }
  };

  const isLastQuestion = currentQuestionIndex === INVESTMENT_SURVEY.questions.length - 1;
  const canProceed = answers[currentQuestion.id] !== undefined;

  return (
    <div className="min-h-screen bg-gray-50 pt-12">
      {/* Progress bar */}
      <ProgressBar
        progress={progress}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={INVESTMENT_SURVEY.questions.length}
      />

      {/* Survey content */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <QuestionCard
          question={currentQuestion}
          answer={answers[currentQuestion.id]}
          onAnswer={(answer) => handleAnswer(currentQuestion.id, answer)}
          onNext={() => {
            if (!isLastQuestion) {
              handleNext();
            }
          }}
        />

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>
          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={!canProceed || submitting}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? 'Submitting...' : 'Submit →'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
