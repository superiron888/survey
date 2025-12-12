const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();
    
    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || 'Request failed');
    }

    return data;
  }

  // User APIs
  async createUser(email: string, entryPoint: 'MBTI' | 'ZODIAC' | 'CLASSIC') {
    return this.request<{
      userId: string;
      sessionId: string;
      email: string;
      entryPoint: string;
      createdAt: string;
    }>('/users/create', {
      method: 'POST',
      body: JSON.stringify({ email, entryPoint }),
    });
  }

  async updateUserTags(userId: string, tags: { mbtiType?: string; zodiacSign?: string }) {
    return this.request<{
      userId: string;
      mbtiType: string | null;
      zodiacSign: string | null;
    }>(`/users/${userId}/tags`, {
      method: 'PATCH',
      body: JSON.stringify(tags),
    });
  }

  // Survey APIs
  async saveAnswer(data: {
    userId: string;
    sessionId: string;
    questionId: number;
    answer: any;
  }) {
    return this.request('/survey/answer', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async submitSurvey(userId: string, sessionId: string) {
    return this.request<{
      sessionId: string;
      status: string;
      message: string;
    }>('/survey/submit', {
      method: 'POST',
      body: JSON.stringify({ userId, sessionId }),
    });
  }

  // Report APIs
  async getReport(sessionId: string) {
    return this.request<{
      sessionId: string;
      status: string;
      previewContent?: any;
      fullReportEmailSent?: boolean;
      generatedAt?: string;
      message?: string;
    }>(`/report/${sessionId}`);
  }

  async regenerateReport(sessionId: string) {
    return this.request(`/report/${sessionId}/regenerate`, {
      method: 'POST',
    });
  }
}

export const api = new ApiService();

