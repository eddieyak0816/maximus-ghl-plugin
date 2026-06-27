const axios = require('axios');

const GHL_API_URL = 'https://api.gohighlevel.com/v1';
const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

const client = axios.create({
  baseURL: GHL_API_URL,
  headers: {
    'Authorization': `Bearer ${GHL_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

async function getCalendars() {
  try {
    const response = await client.get(`/calendars?locationId=${GHL_LOCATION_ID}`);
    return response.data.data || [];
  } catch (error) {
    console.error('GHL API error (getCalendars):', error.message);
    return [];
  }
}

async function getAppointments(calendarId, startDate, endDate) {
  try {
    const response = await client.get(`/calendars/${calendarId}/appointments`, {
      params: { startDate, endDate, locationId: GHL_LOCATION_ID }
    });
    return response.data.data || [];
  } catch (error) {
    console.error('GHL API error (getAppointments):', error.message);
    return [];
  }
}

async function createAppointment(data) {
  try {
    const response = await client.post('/appointments', {
      ...data,
      locationId: GHL_LOCATION_ID
    });
    return response.data.data;
  } catch (error) {
    console.error('GHL API error (createAppointment):', error.message);
    throw error;
  }
}

module.exports = { getCalendars, getAppointments, createAppointment };
