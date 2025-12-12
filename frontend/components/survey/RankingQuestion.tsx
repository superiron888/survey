'use client';

import { useState, useEffect } from 'react';

interface RankingQuestionProps {
  questionId: number;
  title: string;
  options: string[];
  touch?: string;
  onAnswer: (answer: any) => void;
  onNext?: () => void;
  initialAnswer?: any;
}

export default function RankingQuestion({
  questionId,
  title,
  options,
  touch,
  onAnswer,
  onNext,
  initialAnswer
}: RankingQuestionProps) {
  const [availableOptions, setAvailableOptions] = useState<string[]>(options);
  const [rankedOptions, setRankedOptions] = useState<string[]>([]);

  useEffect(() => {
    // Restore previous answer
    if (initialAnswer?.rankedValues) {
      const ranked = initialAnswer.rankedValues
        .sort((a: any, b: any) => a.order - b.order)
        .map((item: any) => item.value);
      setRankedOptions(ranked);
      setAvailableOptions(options.filter(opt => !ranked.includes(opt)));
    }
  }, [initialAnswer, options]);

  const handleOptionClick = (option: string) => {
    // Move from available to ranked
    setAvailableOptions(prev => prev.filter(opt => opt !== option));
    
    setRankedOptions(prev => {
      const newRanked = [...prev, option];
      
      // Save answer
      const answer = {
        type: 'ranking',
        rankedValues: newRanked.map((value, index) => ({
          order: index + 1,
          value
        }))
      };
      onAnswer(answer);
      
      // Auto-advance if all options are ranked
      if (newRanked.length === options.length && onNext) {
        setTimeout(() => {
          onNext();
        }, 500);
      }
      
      return newRanked;
    });
  };

  const handleRemoveRanked = (option: string, index: number) => {
    // Move from ranked back to available
    setRankedOptions(prev => prev.filter((_, i) => i !== index));
    setAvailableOptions(prev => [...prev, option]);
  };

  const isComplete = rankedOptions.length === options.length;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
        {touch && (
          <p className="text-sm text-blue-600 italic">{touch}</p>
        )}
      </div>

      {/* Ranked area */}
      <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">
            Your Ranking ({rankedOptions.length} / {options.length})
          </h4>
          {isComplete && (
            <span className="text-green-600 font-semibold">✓ Complete</span>
          )}
        </div>
        {rankedOptions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Tap options below to rank them
          </p>
        ) : (
          <div className="space-y-3">
            {rankedOptions.map((option, index) => (
              <div
                key={option}
                className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleRemoveRanked(option, index)}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-900">{option}</span>
                </div>
                <button
                  className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available options */}
      {availableOptions.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-700 mb-3">
            Available Options
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {availableOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className="bg-white border-2 border-gray-200 rounded-lg p-4 text-left hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <span className="text-gray-900">{option}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
