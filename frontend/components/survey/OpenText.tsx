'use client';

import { useState, useEffect } from 'react';

interface OpenTextProps {
  questionId: number;
  title: string;
  placeholder?: string;
  touch?: string;
  onAnswer: (answer: any) => void;
  initialAnswer?: any;
}

export default function OpenText({
  questionId,
  title,
  placeholder,
  touch,
  onAnswer,
  initialAnswer
}: OpenTextProps) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (initialAnswer?.value) {
      setValue(initialAnswer.value);
    }
  }, [initialAnswer]);

  const handleChange = (text: string) => {
    setValue(text);
    onAnswer({
      type: 'open_text',
      value: text
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
        {touch && (
          <p className="text-sm text-blue-600 italic">{touch}</p>
        )}
      </div>

      <textarea
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        rows={6}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
      />
    </div>
  );
}

