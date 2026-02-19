import { google } from 'googleapis';

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

function getAuthClient() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return auth;
}

export async function appendLeadToSheet(lead: {
  name: string;
  phone: string;
  email?: string;
  zipCode?: string;
  fenceType?: string;
  message?: string;
  campaign?: string;
}) {
  try {
    if (!SPREADSHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.warn('Google Sheets credentials not configured');
      return { success: false, error: 'Credentials not configured' };
    }

    const auth = getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });

    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    // Ordem: Campaign | Name | Phone Number | Email | Fence Type | Message | Zip Code
    const values = [
      [
        lead.campaign || 'general',
        lead.name,
        lead.phone,
        lead.email || '',
        lead.fenceType || '',
        lead.message || '',
        lead.zipCode || '',
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'LEADS!A:G',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    console.log('Lead appended to Google Sheets successfully');
    return { success: true };
  } catch (error) {
    console.error('Error appending to Google Sheets:', error);
    return { success: false, error: String(error) };
  }
}
