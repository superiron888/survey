'use client';

import { SurveyQuestion } from '@/config/survey';
import SingleChoice from './SingleChoice';
import MultipleChoice from './MultipleChoice';
import RankingQuestion from './RankingQuestion';
import OpenText from './OpenText';

interface QuestionCardProps {
  question: SurveyQuestion;
  answer?: any;
  onAnswer: (answer: any) => void;
  onNext?: () => void;
}

export default function QuestionCard({ question, answer, onAnswer, onNext }: QuestionCardProps) {
  const renderQuestion = () => {
    switch (question.type) {
      case 'single_choice':
        return (
          <SingleChoice
            questionId={question.id}
            title={question.title}
            options={question.options || []}
            touch={question.touch}
            onAnswer={onAnswer}
            initialAnswer={answer}
            onNext={onNext}
          />
        );
      case 'multiple_choice':
        return (
          <MultipleChoice
            questionId={question.id}
            title={question.title}
            options={question.options || []}
            allowOtherText={question.allowOtherText}
            otherPlaceholder={question.otherPlaceholder}
            touch={question.touch}
            onAnswer={onAnswer}
            initialAnswer={answer}
            // Multiple choice usually requires explicit "Next" button, so we don't pass onNext
          />
        );
      case 'ranking':
        return (
          <RankingQuestion
            questionId={question.id}
            title={question.title}
            options={question.options || []}
            touch={question.touch}
            onAnswer={onAnswer}
            initialAnswer={answer}
            onNext={onNext}
          />
        );
      case 'open_text':
        return (
          <OpenText
            questionId={question.id}
            title={question.title}
            placeholder={question.placeholder}
            touch={question.touch}
            onAnswer={onAnswer}
            initialAnswer={answer}
            // Open text usually requires explicit "Next"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      {renderQuestion()}
    </div>
  );
}
