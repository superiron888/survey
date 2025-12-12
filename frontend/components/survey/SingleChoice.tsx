'use client';

import { useState, useEffect } from 'react';

interface SingleChoiceProps {
  questionId: number;
  title: string;
  options: string[];
  touch?: string;
  onAnswer: (answer: any) => void;
  onNext?: () => void;
  initialAnswer?: any;
}

export default function SingleChoice({
  questionId,
  title,
  options,
  touch,
  onAnswer,
  onNext,
  initialAnswer
}: SingleChoiceProps) {
  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    if (initialAnswer?.value) {
      setSelected(initialAnswer.value);
    }
  }, [initialAnswer]);

  const handleSelect = (option: string) => {
    setSelected(option);
    onAnswer({
      type: 'single_choice',
      value: option
    });

    // Auto-advance after 0.4s
    if (onNext) {
      setTimeout(() => {
        onNext();
      }, 400);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
        {touch && (
          <p className="text-sm text-blue-600 italic">{touch}</p>
        )}
      </div>

      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={`
              w-full p-4 rounded-lg border-2 text-left transition-all
              ${selected === option
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
