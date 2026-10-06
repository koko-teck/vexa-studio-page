/* ==========================================
   VEXA ESTUDIO PAGE — COTIZADOR
   Todos los precios están centralizados aquí
   para que sea fácil modificarlos en el futuro.
   ========================================== */

const PRECIOS_PLAN = {
  inicio: 30000,
  negocio: 40000,
  catalogo: 50000,
  catalogoplus: 60000,
  dinamica: 70000,
  tienda: 85000,
  tiendapro: 100000,
  amedida: 0
};

const NOMBRES_PLAN = {
  inicio: 'Página Inicial',
  negocio: 'Página Negocio',
  catalogo: 'Catálogo',
  catalogoplus: 'Catálogo Plus',
  dinamica: 'Web Dinámica',
  tienda: 'Tienda Online',
  tiendapro: 'Tienda Online Pro',
  amedida: 'Necesito algo especial'
};

const PRECIOS_MANTENIMIENTO = {
  inicio: { mensual: 10000, quincenal: 15000, semanal: 25000 },
  negocio: { mensual: 12000, quincenal: 18000, semanal: 30000 },
  catalogo: { mensual: 20000, quincenal: 35000, semanal: 60000 },
  catalogoplus: { mensual: 25000, quincenal: 40000, semanal: 70000 },
  dinamica: { mensual: 30000, quincenal: 50000, semanal: 80000 },
  tienda: { mensual: 35000, quincenal: 60000, semanal: 90000 },
  tiendapro: { mensual: 40000, quincenal: 70000, semanal: 100000 },
  amedida: { mensual: 0, quincenal: 0, semanal: 0 }
};

const PRECIOS_REDES = {
  '0': 0,
  '1': 5000,
  '3': 13000
};

const planSelect = document.getElementById('formatoWeb');
const freqSelect = document.getElementById('frecuenciaMantenimiento');
const redesSelect = document.getElementById('addonRedes');
const whatsappCheck = document.getElementById('addonWhatsapp');
const leadsCheck = document.getElementById('addonLeads');
const triggers = document.querySelectorAll('.val-trigger');

const valPlan = document.getElementById('val-plan');
const valAddons = document.getElementById('val-addons');
const valTotalDesarrollo = document.getElementById('val-total-desarrollo');
const valMantenimiento = document.getElementById('val-mantenimiento');
const lblFreq = document.getElementById('lbl-freq');
const listaDetalleAddons = document.getElementById('detalle-addons-lista');
const detRedes = document.getElementById('det-redes');
const valDetRedes = document.getElementById('val-det-redes');
const detWsp = document.getElementById('det-wsp');
const detLeads = document.getElementById('det-leads');
const form = document.getElementById('cotizadorForm');
const toast = document.getElementById('mensajeExito');

function formatoMoneda(valor) {
  return valor === 0 ? '$ 0' : '$ ' + new Intl.NumberFormat('es-AR').format(valor);
}

function actualizarFrecuencia() {
  const planKey = planSelect.value;
  const hayPlan = Boolean(planKey);
  const opciones = freqSelect.querySelectorAll('option');

  freqSelect.disabled = !hayPlan;

  if (!hayPlan) {
    freqSelect.value = '';
    if (opciones[0]) opciones[0].textContent = 'Elegí primero una web...';
    return;
  }

  if (opciones[0]) opciones[0].textContent = 'Elegí una frecuencia...';
}

function calcularCotizacion() {
  const planKey = planSelect.value;
  const freqKey = freqSelect.value;
  const redesKey = redesSelect.value;
  const tieneWsp = whatsappCheck.checked;
  const tieneLeads = leadsCheck.checked;
  const esAMedida = planKey === 'amedida';

  const totalPlan = PRECIOS_PLAN[planKey] ?? 0;
  const costoRedes = PRECIOS_REDES[redesKey] ?? 0;
  const costoWsp = tieneWsp ? Number(whatsappCheck.value) : 0;
  const costoLeads = tieneLeads ? Number(leadsCheck.value) : 0;
  const totalAddons = costoRedes + costoWsp + costoLeads;

  let totalMantenimiento = 0;
  if (planKey && freqKey && !esAMedida) {
    totalMantenimiento = PRECIOS_MANTENIMIENTO[planKey]?.[freqKey] ?? 0;
  }

  valPlan.textContent = esAMedida ? 'A cotizar' : formatoMoneda(totalPlan);
  valAddons.textContent = formatoMoneda(totalAddons);
  valTotalDesarrollo.textContent = esAMedida
    ? 'A cotizar'
    : formatoMoneda(totalPlan + totalAddons) + ' ARS';

  lblFreq.textContent = freqKey
    ? freqSelect.options[freqSelect.selectedIndex].textContent.split('(')[0].trim()
    : '-';

  if (esAMedida) {
    valMantenimiento.innerHTML = 'A cotizar';
  } else {
    valMantenimiento.innerHTML = `${formatoMoneda(totalMantenimiento)} <small>/mes</small>`;
  }

  if (totalAddons > 0) {
    listaDetalleAddons.classList.remove('hidden');

    if (costoRedes > 0) {
      detRedes.classList.remove('hidden');
      valDetRedes.textContent = formatoMoneda(costoRedes);
    } else {
      detRedes.classList.add('hidden');
    }

    detWsp.classList.toggle('hidden', !tieneWsp);
    detLeads.classList.toggle('hidden', !tieneLeads);
  } else {
    listaDetalleAddons.classList.add('hidden');
  }
}

planSelect.addEventListener('change', () => {
  actualizarFrecuencia();
  calcularCotizacion();
});

triggers.forEach(trigger => {
  if (trigger !== planSelect) trigger.addEventListener('change', calcularCotizacion);
});

/* =========================================================
   ENVÍO DE SOLICITUDES POR EMAIL — NUEVO
   =========================================================
   No se modificó la lógica del cotizador ni sus precios.

   IMPORTANTE: reemplazá SOLO el correo de abajo por el Gmail
   de tu empresa. Ejemplo: contacto@tuempresa.com o tuempresa@gmail.com

   El envío se hace mediante FormSubmit, así que no necesitás
   crear un servidor/backend propio.
   ========================================================= */
const EMAIL_EMPRESA = 'xenastudiopage@gmail.com';
const FORM_SUBMIT_URL = `https://formsubmit.co/ajax/${EMAIL_EMPRESA}`;

async function enviarSolicitudPorEmail() {
  const planKey = planSelect.value;
  const freqKey = freqSelect.value;
  const redesKey = redesSelect.value;
  const tieneWsp = whatsappCheck.checked;
  const tieneLeads = leadsCheck.checked;

  const totalPlan = PRECIOS_PLAN[planKey] ?? 0;
  const costoRedes = PRECIOS_REDES[redesKey] ?? 0;
  const costoWsp = tieneWsp ? Number(whatsappCheck.value) : 0;
  const costoLeads = tieneLeads ? Number(leadsCheck.value) : 0;
  const totalAddons = costoRedes + costoWsp + costoLeads;
  const totalDesarrollo = planKey === 'amedida' ? 'A cotizar' : formatoMoneda(totalPlan + totalAddons) + ' ARS';
  const mantenimiento = planKey === 'amedida'
    ? 'A cotizar'
    : formatoMoneda(PRECIOS_MANTENIMIENTO[planKey]?.[freqKey] ?? 0) + ' /mes';

  // Tomamos el teléfono directamente del elemento del formulario y lo enviamos
  // con un nombre técnico simple para evitar que el servicio de correo lo omita.
  const telefono = document.getElementById('whatsapp').value.trim();

  if (!telefono) {
    throw new Error('El teléfono de contacto es obligatorio.');
  }

  const datos = {
    _subject: `Nueva solicitud web — ${document.getElementById('nombreNegocio').value}`,
    _template: 'table',
    _captcha: 'false',

    'Nombre del emprendimiento': document.getElementById('nombreNegocio').value,
    'Publico objetivo': document.getElementById('publicoObjetivo').value,

    // Varias etiquetas con el mismo valor para que el contacto quede visible
    // incluso si el cliente de correo interpreta distinto alguna etiqueta.
    telefono: telefono,
    whatsapp: telefono,
    'Contacto telefonico': telefono,

    'Tipo de web': NOMBRES_PLAN[planKey] ?? planKey,
    'Frecuencia de mantenimiento': freqSelect.options[freqSelect.selectedIndex]?.textContent ?? '',
    'Redes sociales': redesSelect.options[redesSelect.selectedIndex]?.textContent ?? '',
    'Boton de WhatsApp': tieneWsp ? 'Sí' : 'No',
    'Formulario de consultas': tieneLeads ? 'Sí' : 'No',
    'Inversion inicial': totalDesarrollo,
    'Cuota de mantenimiento': mantenimiento
  };

  const respuesta = await fetch(FORM_SUBMIT_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  if (!respuesta.ok) {
    throw new Error('No se pudo enviar la solicitud.');
  }

  const resultado = await respuesta.json().catch(() => ({}));
  if (resultado.success === false) {
    throw new Error(resultado.message || 'El servicio de correo rechazó la solicitud.');
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const botonEnviar = form.querySelector('.button-submit');
  const textoOriginal = botonEnviar.textContent;
  botonEnviar.disabled = true;
  botonEnviar.textContent = 'Enviando...';

  try {
    await enviarSolicitudPorEmail();

    toast.querySelector('strong').textContent = 'Solicitud enviada';
    toast.querySelector('p').textContent = 'Recibimos tus datos. Pronto nos pondremos en contacto para ayudarte.';
    toast.style.display = 'flex';
    toast.style.opacity = '0';
    requestAnimationFrame(() => {
      toast.style.transition = 'opacity .25s ease';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => { toast.style.display = 'none'; }, 260);
    }, 4200);
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
    toast.querySelector('strong').textContent = 'No se pudo enviar';
    toast.querySelector('p').textContent = 'Revisá tu conexión o la configuración del correo e intentá nuevamente.';
    toast.style.display = 'flex';
    toast.style.opacity = '1';
  } finally {
    botonEnviar.disabled = false;
    botonEnviar.textContent = textoOriginal;
  }
});

actualizarFrecuencia();
calcularCotizacion();
