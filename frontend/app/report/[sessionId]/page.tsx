'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ReportPage() {
  const router = useRouter();
  const [betaOptIn, setBetaOptIn] = useState(false);

  const handleBetaOptIn = (checked: boolean) => {
    setBetaOptIn(checked);
    // In a real app, you would send this preference to the backend here
    // api.updateUserPreference({ betaOptIn: checked });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Success Header */}
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center slide-up">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Submission Successful!</h1>
          <p className="text-xl text-gray-600">
            Your investment profile data has been securely archived.
          </p>
          <div className="mt-6 p-4 bg-green-50 rounded-lg inline-block text-green-700 font-medium">
             ✓ Survey Received
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl p-8 shadow-lg slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-blue-500 pl-4">What Happens Next?</h2>
          <div className="mb-8">
            <p className="text-gray-600 leading-relaxed text-lg">
              Our analyst team will conduct a deep diagnosis based on your responses.
              <br/><br/>
              <strong>The formal report will be sent to your email in <span className="text-blue-600 font-bold">1-2 days</span>.</strong>
            </p>
          </div>
        </div>

        {/* Beta Invitation */}
        <div className="bg-white rounded-2xl p-8 shadow-lg slide-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-purple-500 pl-4">Join Our Innovation Lab</h2>
            <div className="mb-8">
                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    We are building a more in-depth investment analysis engine. This is an <strong>Innovation Lab Project</strong> and is completely <strong>free of charge</strong>.
                    <br/><br/>
                    Would you like to become our beta tester and get early access to advanced features?
                </p>
                
                <label className="flex items-start space-x-3 p-4 border rounded-xl hover:bg-gray-50 cursor-pointer transition-colors bg-purple-50 border-purple-100">
                    <input 
                      type="checkbox" 
                      className="w-6 h-6 text-purple-600 rounded focus:ring-purple-500 border-gray-300 mt-0.5" 
                      checked={betaOptIn}
                      onChange={(e) => handleBetaOptIn(e.target.checked)}
                    />
                    <div>
                        <span className="text-gray-900 font-bold">Yes, I'm interested.</span>
                        <p className="text-sm text-gray-500 mt-1">I understand this is a free community project.</p>
                    </div>
                </label>
                
                {betaOptIn && (
                  <p className="text-green-600 mt-3 text-sm font-medium animate-pulse">
                    Thanks! We've noted your interest.
                  </p>
                )}
            </div>
        </div>
        
        <div className="text-center pt-8">
           <button 
             onClick={() => router.push('/')}
             className="text-gray-400 hover:text-gray-600 text-sm font-medium transition-colors"
           >
             Return to Home
           </button>
        </div>
      </div>
    </div>
  );
}
