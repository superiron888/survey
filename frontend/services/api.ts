const API_BASE_URL = '/api';

const realApi = {
  // Create user session
  createUser: async (email: string, entryPoint: string) => {
    const response = await fetch(`${API_BASE_URL}/users/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, entryPoint })
    });
    return response.json();
  },

  // Update user tags
  updateTags: async (userId: string, tags: { mbtiType?: string; zodiacSign?: string }) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/tags`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tags)
    });
    return response.json();
  },

  // Save single answer
  saveAnswer: async (data: { userId: string; sessionId: string; questionId: number; answer: any }) => {
    const response = await fetch(`${API_BASE_URL}/survey/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  // Submit full survey
  submitSurvey: async (userId: string, sessionId: string) => {
    const response = await fetch(`${API_BASE_URL}/survey/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, sessionId })
    });
    return response.json();
  },

  // Get report status and content
  getReport: async (sessionId: string) => {
    const response = await fetch(`${API_BASE_URL}/report/${sessionId}`);
    return response.json();
  },

  // Regenerate report (disabled in manual mode)
  regenerateReport: async (sessionId: string) => {
    return { success: true, message: 'Manual review mode' };
  }
};

export const api = realApi;
