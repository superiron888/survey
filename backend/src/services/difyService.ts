interface DifyAnalysisInput {
  userId: string;
  sessionId: string;
  entryPoint: string;
  mbtiType?: string | null;
  zodiacSign?: string | null;
  responses: Array<{
    questionId: number;
    questionTitle: string;
    answer: any;
  }>;
}

interface DifyAnalysisOutput {
  summary: string;
  investorProfile: {
    riskTolerance: string;
    investmentStyle: string;
    timeHorizon: string;
    emotionalPattern: string;
  };
  blindSpots: string[];
  strengths: string[];
  recommendations: string[];
  fullAnalysis: string;
}

class DifyService {
  private apiKey: string;
  private apiUrl: string;
  private timeout: number;

  constructor() {
    this.apiKey = process.env.DIFY_API_KEY || '';
    this.apiUrl = process.env.DIFY_API_URL || 'https://api.dify.ai/v1';
    this.timeout = 120000; // 120 seconds
  }

  /**
   * Generate investment analysis report
   */
  async generateAnalysis(input: DifyAnalysisInput): Promise<DifyAnalysisOutput> {
    try {
      // 1. Format survey data as analysis prompt
      const analysisPrompt = this.formatAnalysisPrompt(input);

      // 2. Call Dify API
      const response = await fetch(`${this.apiUrl}/chat-messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: {
            survey_data: analysisPrompt,
            entry_point: input.entryPoint,
            mbti_type: input.mbtiType || '',
            zodiac_sign: input.zodiacSign || ''
          },
          query: this.getAnalysisQuery(),
          response_mode: 'blocking',
          user: input.userId,
          conversation_id: input.sessionId
        }),
        signal: AbortSignal.timeout(this.timeout)
      });

      if (!response.ok) {
        throw new Error(`Dify API error: ${response.status}`);
      }

      const result = await response.json();

      // 3. Parse AI response
      return this.parseAnalysisResponse(result);
    } catch (error) {
      console.error('Dify analysis failed:', error);
      throw error;
    }
  }

  /**
   * Format analysis prompt
   */
  private formatAnalysisPrompt(input: DifyAnalysisInput): string {
    const sections: string[] = [];

    // Basic info
    sections.push(`## 用户基本信息`);
    sections.push(`- 入口方式: ${input.entryPoint}`);
    if (input.mbtiType) sections.push(`- MBTI类型: ${input.mbtiType}`);
    if (input.zodiacSign) sections.push(`- 星座: ${input.zodiacSign}`);
    sections.push('');

    // Survey responses
    sections.push(`## 问卷回答详情`);
    input.responses.forEach((response, index) => {
      sections.push(`### 问题 ${index + 1}: ${response.questionTitle}`);
      sections.push(`回答: ${JSON.stringify(response.answer, null, 2)}`);
      sections.push('');
    });

    return sections.join('\n');
  }

  /**
   * Get analysis query
   */
  private getAnalysisQuery(): string {
    return `请基于用户提供的21个问卷答案，生成一份深度的投资觉察分析报告。

**分析要求：**

1. **投资者画像** - 综合分析用户的：
   - 风险承受能力（基于第3、12题）
   - 投资风格（主动/被动、短期/长期）
   - 时间投入意愿
   - 情绪管理能力

2. **投资盲点诊断** - 识别用户在以下方面的潜在盲区：
   - 决策障碍（第10题）
   - 信息来源偏差（第11题）
   - 风险认知偏差
   - 执行力问题

3. **优势识别** - 发现用户的投资优势：
   - 心智成熟度
   - 学习能力
   - 策略一致性

4. **成长路径建议** - 提供具体的改进方向（注意：仅分析，不提供具体投资建议）

**输出格式（JSON）：**
{
  "summary": "100-150字的总体概述",
  "investorProfile": {
    "riskTolerance": "低/中/高",
    "investmentStyle": "价值型/成长型/平衡型等",
    "timeHorizon": "短期/中期/长期",
    "emotionalPattern": "情绪型/理性型/混合型"
  },
  "blindSpots": ["盲点1", "盲点2", "盲点3"],
  "strengths": ["优势1", "优势2", "优势3"],
  "recommendations": ["建议1", "建议2", "建议3"],
  "fullAnalysis": "完整的详细分析文本（800-1200字）"
}

**注意事项：**
- 语气友好、真诚，像朋友对话
- 避免专业术语堆砌
- 重点关注"觉察"而非"建议"
- 不提供具体的买卖建议
- 强调这是公益项目，不收费`;
  }

  /**
   * Parse AI response
   */
  private parseAnalysisResponse(difyResponse: any): DifyAnalysisOutput {
    try {
      const answerText = difyResponse.answer || difyResponse.content;

      // Try to parse JSON
      if (typeof answerText === 'string') {
        // Remove possible markdown code block markers
        const cleanText = answerText
          .replace(/```json\n?/g, '')
          .replace(/```\n?/g, '')
          .trim();
        
        const parsed = JSON.parse(cleanText);
        return parsed as DifyAnalysisOutput;
      }

      throw new Error('Unable to parse AI response');
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      
      // Fallback: return basic structure
      return {
        summary: "抱歉，分析报告生成遇到问题，请稍后重试。",
        investorProfile: {
          riskTolerance: "待分析",
          investmentStyle: "待分析",
          timeHorizon: "待分析",
          emotionalPattern: "待分析"
        },
        blindSpots: [],
        strengths: [],
        recommendations: [],
        fullAnalysis: "报告生成失败，请联系支持团队。"
      };
    }
  }

  /**
   * Generate lightweight preview
   */
  generatePreview(fullReport: DifyAnalysisOutput): any {
    return {
      summary: fullReport.summary,
      keyInsights: [
        ...fullReport.blindSpots.slice(0, 2),
        ...fullReport.strengths.slice(0, 2)
      ],
      profileHighlights: {
        riskLevel: fullReport.investorProfile.riskTolerance,
        style: fullReport.investorProfile.investmentStyle
      }
    };
  }
}

export default new DifyService();
