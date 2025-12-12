'use client';

import { useState, useEffect } from 'react';

interface MultipleChoiceProps {
  questionId: number;
  title: string;
  options: string[];
  allowOtherText?: boolean;
  otherPlaceholder?: string;
  touch?: string;
  onAnswer: (answer: any) => void;
  initialAnswer?: any;
}

export default function MultipleChoice({
  questionId,
  title,
  options,
  allowOtherText,
  otherPlaceholder,
  touch,
  onAnswer,
  initialAnswer
}: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [otherText, setOtherText] = useState('');

  useEffect(() => {
    if (initialAnswer?.values) {
      setSelected(initialAnswer.values);
      if (initialAnswer.otherText) {
        setOtherText(initialAnswer.otherText);
      }
    }
  }, [initialAnswer]);

  const handleToggle = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter(o => o !== option)
      : [...selected, option];
    
    setSelected(newSelected);
    updateAnswer(newSelected, otherText);
  };

  const handleOtherTextChange = (text: string) => {
    setOtherText(text);
    updateAnswer(selected, text);
  };

  const updateAnswer = (values: string[], other: string) => {
    const answer: any = {
      type: 'multiple_choice',
      values
    };
    if (allowOtherText && other) {
      answer.otherText = other;
    }
    onAnswer(answer);
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
          <label
            key={option}
            className={`
              flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-gray-50
              ${selected.includes(option) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
            `}
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => handleToggle(option)}
              className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-900">{option}</span>
          </label>
        ))}
      </div>

      {allowOtherText && (
        <div className="mt-4">
          <input
            type="text"
            value={otherText}
            onChange={(e) => handleOtherTextChange(e.target.value)}
            placeholder={otherPlaceholder || 'Other...'}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
