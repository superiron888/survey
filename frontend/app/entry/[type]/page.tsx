'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { MBTI_TYPES, ZODIAC_SIGNS } from '@/config/survey';
import { api } from '@/services/api';

export default function EntrySelectionPage() {
  const params = useParams();
  const router = useRouter();
  const type = params.type as string;
  const isMBTI = type === 'mbti';
  const isZodiac = type === 'zodiac';

  const [selected, setSelected] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isMBTI && !isZodiac) {
      router.push('/');
    }
  }, [isMBTI, isZodiac, router]);

  const handleSelect = async (value: string) => {
    setSelected(value);
    setLoading(true);

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        router.push('/');
        return;
      }

      // Update user tags
      if (isMBTI) {
        await api.updateTags(userId, { mbtiType: value });
      } else {
        await api.updateTags(userId, { zodiacSign: value });
      }

      // Navigate to survey
      const sessionId = localStorage.getItem('sessionId');
      if (sessionId) {
        router.push(`/survey/${sessionId}`);
      }
    } catch (error) {
      console.error('Failed to update tags:', error);
      setLoading(false);
    }
  };

  const options = isMBTI ? MBTI_TYPES : ZODIAC_SIGNS;
  const title = isMBTI ? 'Select Your MBTI Type' : 'Select Your Zodiac Sign';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">{title}</h1>
          <p className="text-gray-600 text-center mb-8">
            Choose the option that best represents you
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                disabled={loading}
                className={`
                  p-4 rounded-lg border-2 transition-all
                  ${selected === option
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }
                  ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <div className="font-semibold">{option}</div>
              </button>
            ))}
          </div>

          {loading && (
            <div className="mt-6 text-center text-gray-600">
              Loading...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

