'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';

interface EmailModalProps {
  isOpen: boolean;
  entryPoint: 'MBTI' | 'ZODIAC' | 'CLASSIC';
  onClose: () => void;
}

export default function EmailModal({ isOpen, entryPoint, onClose }: EmailModalProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      // Create user session
      const response = await api.createUser(email, entryPoint);

      // Check if API returned an error
      if (!response.success || !response.data) {
        throw new Error(response.error?.message || 'Failed to create session');
      }

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('sessionId', response.data.sessionId);
        localStorage.setItem('email', email);
      }

      // Navigate to corresponding entry
      if (entryPoint === 'CLASSIC') {
        router.push(`/survey/${response.data.sessionId}`);
      } else {
        router.push(`/entry/${entryPoint.toLowerCase()}`);
      }
    } catch (err: any) {
      console.error('Create user error:', err);
      setError(err.message || 'Failed to create session, please try again');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            📧 Start Your Journey
          </h2>
          <p className="text-gray-600">
            Complete analysis report will be sent to your email
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              required
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Start Diagnosis'}
          </button>
        </form>
        <p className="mt-4 text-xs text-gray-500 text-center">
          🧪 An Innovation Lab experiment · Your data helps us explore new insights
        </p>
      </div>
    </div>
  );
}
