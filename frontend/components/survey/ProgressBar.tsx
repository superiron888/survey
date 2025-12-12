'use client';

interface ProgressBarProps {
  progress: number;
  currentQuestion: number;
  totalQuestions: number;
}

export default function ProgressBar({ progress, currentQuestion, totalQuestions }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-200 h-2 fixed top-0 left-0 z-10">
      <div
        className="bg-blue-500 h-2 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
      <div className="absolute top-3 right-4 text-sm text-gray-600 font-medium">
        {currentQuestion} / {totalQuestions}
      </div>
    </div>
  );
}

