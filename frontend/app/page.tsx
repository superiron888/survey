'use client';

import { useState } from 'react';
import EmailModal from '@/components/EmailModal';

export default function Home() {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<'MBTI' | 'ZODIAC' | 'CLASSIC' | null>(null);

  const handleEntryClick = (entry: 'MBTI' | 'ZODIAC' | 'CLASSIC') => {
    setSelectedEntry(entry);
    setEmailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Investment Awareness
          </h1>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            This is not an ordinary survey, but a self-dialogue about your current investment state.
          </p>
        </div>

        {/* Entry Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* MBTI Entry */}
          <button
            onClick={() => handleEntryClick('MBTI')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-500"
          >
            <div className="text-center">
              <div className="text-5xl mb-4">🧠</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">MBTI</h2>
              <p className="text-gray-600 text-sm">
                Start with your personality type
              </p>
            </div>
          </button>

          {/* Zodiac Entry */}
          <button
            onClick={() => handleEntryClick('ZODIAC')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-500"
          >
            <div className="text-center">
              <div className="text-5xl mb-4">⭐</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Zodiac</h2>
              <p className="text-gray-600 text-sm">
                Begin with your zodiac sign
              </p>
            </div>
          </button>

          {/* Classic Entry */}
          <button
            onClick={() => handleEntryClick('CLASSIC')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-500"
          >
            <div className="text-center">
              <div className="text-5xl mb-4">📊</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Classic</h2>
              <p className="text-gray-600 text-sm">
                Professional version
              </p>
            </div>
          </button>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What you'll get:</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Comprehensive investment profile analysis
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Blind spot diagnosis
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Personalized growth recommendations
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Full report sent directly to your inbox
            </li>
          </ul>
        </div>

        {/* Innovation Lab Note */}
        <p className="text-center text-sm text-gray-500 mt-6">
          🧪 An Innovation Lab experiment · Exploring new ways to understand investor behavior
        </p>

        {/* Email Modal */}
        {selectedEntry && (
          <EmailModal
            isOpen={emailModalOpen}
            entryPoint={selectedEntry}
            onClose={() => {
              setEmailModalOpen(false);
              setSelectedEntry(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
