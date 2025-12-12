import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

// MOCK SWITCH: Set to true to test UI without backend
const USE_MOCK = false;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const realApi = {
  // Create user session
  createUser: async (email: string, entryPoint: string) => {
    const response = await apiClient.post('/users/create', { email, entryPoint });
    return response.data;
  },

  // Update user tags
  updateTags: async (userId: string, tags: { mbtiType?: string; zodiacSign?: string }) => {
    const response = await apiClient.patch(`/users/${userId}/tags`, tags);
    return response.data;
  },

  // Save single answer
  saveAnswer: async (data: { userId: string; sessionId: string; questionId: number; answer: any }) => {
    const response = await apiClient.post('/survey/answer', data);
    return response.data;
  },

  // Submit full survey
  submitSurvey: async (userId: string, sessionId: string) => {
    const response = await apiClient.post('/survey/submit', { userId, sessionId });
    return response.data;
  },

  // Get report status and content
  getReport: async (sessionId: string) => {
    const response = await apiClient.get(`/report/${sessionId}`);
    return response.data;
  },

  // Regenerate report
  regenerateReport: async (sessionId: string) => {
    const response = await apiClient.post(`/report/${sessionId}/regenerate`);
    return response.data;
  }
};

// Mock implementation for UI testing
const mockApi = {
  createUser: async (email: string, entryPoint: string) => {
    console.log('👉 [Mock] Create User:', { email, entryPoint });
    await new Promise(r => setTimeout(r, 800)); // Simulate delay
    return {
      success: true,
      data: { 
        userId: 'mock-user-123', 
        sessionId: 'mock-session-abc',
        email,
        entryPoint 
      }
    };
  },

  updateTags: async (userId: string, tags: any) => {
    console.log('👉 [Mock] Update Tags:', tags);
    return { success: true };
  },

  saveAnswer: async (data: any) => {
    console.log('👉 [Mock] Save Answer:', data);
    return { success: true };
  },

  submitSurvey: async (userId: string, sessionId: string) => {
    console.log('👉 [Mock] Submit Survey:', { userId, sessionId });
    await new Promise(r => setTimeout(r, 1500));
    return { success: true };
  },

  getReport: async (sessionId: string) => {
    console.log('👉 [Mock] Get Report');
    // Simulate processing time
    // You can toggle this manually or randomly to test loading state
    const isReady = true; 
    
    if (!isReady) {
      return {
        data: {
          status: 'generating',
          message: 'AI is analyzing...'
        }
      };
    }

    return {
      data: {
        status: 'completed',
        previewContent: {
          summary: "根据您的回答，您展现出【稳健进取型】的投资特质。您在风险控制上有较强的意识（回撤容忍度适中），同时不乏对资产增值的渴望。您的决策主要依赖理性分析，但在面对市场剧烈波动时，可能仍需要更多的情绪管理机制。",
          keyInsights: [
            "决策依赖：您倾向于参考机构研报，这很好，但也容易陷入'权威迷信'的盲区。",
            "执行力：您提到的'知行合一'难点，往往是因为交易系统不够固化导致的。",
            "盲点提示：您可能低估了流动性风险在极端行情下的破坏力。"
          ],
          profileHighlights: {
            riskLevel: "中等偏高",
            style: "成长价值混合"
          }
        },
        fullReportEmailSent: true,
        generatedAt: new Date().toISOString()
      }
    };
  },

  regenerateReport: async () => { return { success: true } }
};

export const api = USE_MOCK ? mockApi : realApi;
