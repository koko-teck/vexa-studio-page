// Vercel Serverless Function: envia un codigo OTP mediante Twilio Verify.
// Requiere: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE_SID

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Método no permitido.' });

  const { phone } = req.body || {};
  if (!phone || !/^\+[1-9]\d{7,14}$/.test(phone)) {
    return res.status(400).json({ ok: false, error: 'Número internacional inválido.' });
  }

  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE_SID } = process.env;
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_VERIFY_SERVICE_SID) {
    return res.status(500).json({ ok: false, error: 'La verificación de teléfono todavía no está configurada.' });
  }

  const auth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64');
  const body = new URLSearchParams({ To: phone, Channel: 'sms' });

  try {
    const response = await fetch(
      `https://verify.twilio.com/v2/Services/${TWILIO_VERIFY_SERVICE_SID}/Verifications`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ ok: false, error: data.message || 'No se pudo enviar el código.' });
    }

    return res.status(200).json({ ok: true, status: data.status });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'No se pudo conectar con el servicio de verificación.' });
  }
}
