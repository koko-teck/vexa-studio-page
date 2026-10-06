import crypto from 'crypto';

function createToken(phone) {
  const payload = Buffer.from(JSON.stringify({ phone, exp: Date.now() + 30 * 60 * 1000 })).toString('base64url');
  const signature = crypto.createHmac('sha256', process.env.VERIFICATION_TOKEN_SECRET).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Método no permitido.' });

  const { phone, code } = req.body || {};
  if (!phone || !/^\+[1-9]\d{7,14}$/.test(phone) || !/^\d{4,10}$/.test(String(code || ''))) {
    return res.status(400).json({ ok: false, error: 'Datos de verificación inválidos.' });
  }

  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE_SID, VERIFICATION_TOKEN_SECRET } = process.env;
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_VERIFY_SERVICE_SID || !VERIFICATION_TOKEN_SECRET) {
    return res.status(500).json({ ok: false, error: 'La verificación de teléfono todavía no está configurada.' });
  }

  const auth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64');
  const body = new URLSearchParams({ To: phone, Code: String(code) });

  try {
    const response = await fetch(
      `https://verify.twilio.com/v2/Services/${TWILIO_VERIFY_SERVICE_SID}/VerificationCheck`,
      {
        method: 'POST',
        headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      }
    );
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ ok: false, error: data.message || 'Código incorrecto.' });
    if (data.status !== 'approved') return res.status(400).json({ ok: false, error: 'El código no es correcto.' });

    return res.status(200).json({ ok: true, token: createToken(phone) });
  } catch {
    return res.status(500).json({ ok: false, error: 'No se pudo comprobar el código.' });
  }
}
