import crypto from 'crypto';

function verifyToken(token, phone) {
  try {
    const [payload, signature] = String(token || '').split('.');
    if (!payload || !signature) return false;
    const expected = crypto.createHmac('sha256', process.env.VERIFICATION_TOKEN_SECRET).update(payload).digest('base64url');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return data.phone === phone && Number(data.exp) > Date.now();
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Método no permitido.' });

  const { verificationToken, phone, ...fields } = req.body || {};
  if (!phone || !verifyToken(verificationToken, phone)) {
    return res.status(403).json({ ok: false, error: 'Primero tenés que verificar tu número de teléfono.' });
  }

  const email = process.env.EMAIL_EMPRESA || 'kokofabrica@gmail.com';
  const form = new URLSearchParams();
  form.append('_subject', `Nueva solicitud web — ${fields['Nombre del emprendimiento'] || 'Sin nombre'}`);
  form.append('_template', 'table');
  form.append('_captcha', 'true');
  form.append('WhatsApp / Teléfono verificado', phone);

  for (const [key, value] of Object.entries(fields)) {
    form.append(key, String(value ?? ''));
  }

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: form.toString()
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.success === false) {
      return res.status(502).json({ ok: false, error: data.message || 'No se pudo enviar la solicitud.' });
    }
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false, error: 'No se pudo conectar con el servicio de correo.' });
  }
}
