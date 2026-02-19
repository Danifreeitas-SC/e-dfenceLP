import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendLeadNotification(lead: {
  name: string;
  phone: string;
  email?: string;
  zipCode?: string;
  fenceType?: string;
  message?: string;
  campaign?: string;
}) {
  try {
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      console.warn('SMTP credentials not configured');
      return { success: false, error: 'SMTP not configured' };
    }

    const campaignLabels: Record<string, string> = {
      wildlife: '🦌 Wildlife Control',
      pets: '🐕 Pet Safety',
      privacy: '🏠 Privacy Fencing',
      general: '📋 General Inquiry',
    };

    const campaignLabel = campaignLabels[lead.campaign || 'general'] || lead.campaign;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1a365d; padding: 20px; text-align: center;">
          <h1 style="color: #ed8936; margin: 0;">🚨 New Lead!</h1>
        </div>
        
        <div style="background-color: #f7fafc; padding: 20px;">
          <h2 style="color: #1a365d; border-bottom: 2px solid #ed8936; padding-bottom: 10px;">
            ${campaignLabel}
          </h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #1a365d; width: 120px;">Name:</td>
              <td style="padding: 10px;">${lead.name}</td>
            </tr>
            <tr style="background-color: #edf2f7;">
              <td style="padding: 10px; font-weight: bold; color: #1a365d;">Phone:</td>
              <td style="padding: 10px;">
                <a href="tel:${lead.phone}" style="color: #ed8936; font-weight: bold;">${lead.phone}</a>
              </td>
            </tr>
            ${lead.email ? `
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #1a365d;">Email:</td>
              <td style="padding: 10px;">
                <a href="mailto:${lead.email}" style="color: #1a365d;">${lead.email}</a>
              </td>
            </tr>
            ` : ''}
            ${lead.zipCode ? `
            <tr style="background-color: #edf2f7;">
              <td style="padding: 10px; font-weight: bold; color: #1a365d;">Zip Code:</td>
              <td style="padding: 10px;">${lead.zipCode}</td>
            </tr>
            ` : ''}
            ${lead.fenceType ? `
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #1a365d;">Fence Type:</td>
              <td style="padding: 10px;">${lead.fenceType}</td>
            </tr>
            ` : ''}
            ${lead.message ? `
            <tr style="background-color: #edf2f7;">
              <td style="padding: 10px; font-weight: bold; color: #1a365d; vertical-align: top;">Message:</td>
              <td style="padding: 10px;">${lead.message}</td>
            </tr>
            ` : ''}
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #ed8936; border-radius: 8px; text-align: center;">
            <a href="tel:${lead.phone}" style="color: white; text-decoration: none; font-size: 18px; font-weight: bold;">
              📞 Call Now: ${lead.phone}
            </a>
          </div>
        </div>
        
        <div style="background-color: #1a365d; padding: 15px; text-align: center;">
          <p style="color: #a0aec0; margin: 0; font-size: 12px;">
            E&D Fencing Inc. - Lead Notification System
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"E&D Fencing Leads" <${process.env.SMTP_EMAIL}>`,
      to: process.env.NOTIFICATION_EMAIL || process.env.SMTP_EMAIL,
      subject: `🚨 New Lead: ${lead.name} - ${campaignLabel}`,
      html: htmlContent,
    });

    console.log('Lead notification email sent successfully');
    return { success: true };
  } catch (error) {
    console.error('Error sending lead notification:', error);
    return { success: false, error: String(error) };
  }
}
