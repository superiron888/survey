// Note: Install resend package: npm install resend
// For now, using a mock implementation that can be replaced with actual Resend

interface EmailAnalysisReport {
  to: string;
  user: any;
  analysis: any;
}

class EmailService {
  /**
   * Send analysis report email
   */
  async sendAnalysisReport(email: string, user: any, analysis: any): Promise<void> {
    try {
      const htmlContent = this.generateReportHTML(user, analysis);

      // If Resend is configured, use it
      if (process.env.RESEND_API_KEY) {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'Investment Awareness <noreply@investmentawareness.com>',
          to: email,
          subject: '🎯 Your Investment Awareness Analysis Report is Ready',
          html: htmlContent
        });

        console.log(`Email sent successfully: ${email}`);
      } else {
        // Mock/Log for development
        console.log('=== EMAIL CONTENT (Development Mode) ===');
        console.log(`To: ${email}`);
        console.log(`Subject: 🎯 Your Investment Awareness Analysis Report is Ready`);
        console.log('HTML Content:', htmlContent.substring(0, 500) + '...');
        console.log('=== END EMAIL ===');
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  }

  /**
   * Generate report HTML
   */
  private generateReportHTML(user: any, analysis: any): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      border-bottom: 2px solid #0ea5e9;
      padding-bottom: 20px;
    }
    .header h1 {
      color: #0ea5e9;
      margin: 0;
      font-size: 28px;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 20px;
      color: #0ea5e9;
      margin-bottom: 15px;
      font-weight: 600;
    }
    .profile-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 20px;
    }
    .profile-item {
      background: #f0f9ff;
      padding: 15px;
      border-radius: 8px;
      border-left: 3px solid #0ea5e9;
    }
    .profile-label {
      font-size: 12px;
      color: #6b7280;
      margin-bottom: 5px;
    }
    .profile-value {
      font-size: 16px;
      font-weight: 600;
      color: #111827;
    }
    .list-item {
      background: #f9fafb;
      padding: 12px 15px;
      margin-bottom: 10px;
      border-radius: 6px;
      border-left: 3px solid #10b981;
    }
    .blindspot-item {
      border-left-color: #f59e0b;
    }
    .full-analysis {
      background: #f9fafb;
      padding: 20px;
      border-radius: 8px;
      line-height: 1.8;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      color: #6b7280;
      font-size: 14px;
    }
    .cta-button {
      display: inline-block;
      background: #0ea5e9;
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 6px;
      margin-top: 20px;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 Your Investment Awareness Analysis Report</h1>
      <p style="color: #6b7280; margin-top: 10px;">A deep dialogue about your current investment state</p>
    </div>
    <div class="section">
      <p style="font-size: 18px; color: #111827; line-height: 1.8;">${analysis.summary || 'Analysis summary'}</p>
    </div>
    <div class="section">
      <div class="section-title">📊 Your Investor Profile</div>
      <div class="profile-grid">
        <div class="profile-item">
          <div class="profile-label">Risk Tolerance</div>
          <div class="profile-value">${analysis.investorProfile?.riskTolerance || 'N/A'}</div>
        </div>
        <div class="profile-item">
          <div class="profile-label">Investment Style</div>
          <div class="profile-value">${analysis.investorProfile?.investmentStyle || 'N/A'}</div>
        </div>
        <div class="profile-item">
          <div class="profile-label">Time Horizon</div>
          <div class="profile-value">${analysis.investorProfile?.timeHorizon || 'N/A'}</div>
        </div>
        <div class="profile-item">
          <div class="profile-label">Emotional Pattern</div>
          <div class="profile-value">${analysis.investorProfile?.emotionalPattern || 'N/A'}</div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section-title">⚠️ Investment Blind Spot Diagnosis</div>
      ${(analysis.blindSpots || []).map((blindspot: string) => `
        <div class="list-item blindspot-item">${blindspot}</div>
      `).join('')}
    </div>
    <div class="section">
      <div class="section-title">✨ Your Investment Strengths</div>
      ${(analysis.strengths || []).map((strength: string) => `
        <div class="list-item">${strength}</div>
      `).join('')}
    </div>
    <div class="section">
      <div class="section-title">🎯 Growth Path Recommendations</div>
      ${(analysis.recommendations || []).map((rec: string, index: number) => `
        <div class="list-item">${index + 1}. ${rec}</div>
      `).join('')}
    </div>
    <div class="section">
      <div class="section-title">📝 Complete Deep Analysis</div>
      <div class="full-analysis">
        ${(analysis.fullAnalysis || '').split('\n').map((para: string) => 
          para ? `<p style="margin-bottom: 15px;">${para}</p>` : ''
        ).join('')}
      </div>
    </div>
    <div class="footer">
      <p><strong>💡 This is a public welfare project, completely free</strong></p>
      <p>If this report is helpful to you, welcome to share it with more friends in need</p>
      <p style="margin-top: 30px; font-size: 12px;">Please note: This report only provides investment awareness analysis and does not constitute any investment advice.<br>Investments carry risks, decisions require caution.</p>
    </div>
  </div>
</body>
</html>
    `;
  }
}

export default new EmailService();

