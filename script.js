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

const DESCRIPCIONES_PLAN = {
  inicio: 'Presentación simple y profesional para mostrar tu negocio.',
  negocio: 'Más secciones para servicios, información y contacto.',
  catalogo: 'Catálogo visual de productos con fotos, precios y consultas.',
  catalogoplus: 'Catálogo más completo, con más organización y contenido.',
  dinamica: 'Web con interacción, formularios y recorridos más avanzados.',
  tienda: 'Tienda online con carrito y herramientas de compra.',
  tiendapro: 'Experiencia de e-commerce más completa, redes y funciones avanzadas.',
  amedida: 'Proyecto especial definido según tu idea y necesidades.'
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
const selectedPlanName = document.getElementById('selectedPlanName');
const selectedPlanDescription = document.getElementById('selectedPlanDescription');
const selectedPlanBox = document.getElementById('selectedPlanBox');
const valPlanName = document.getElementById('val-plan-name');
const valPlanDescription = document.getElementById('val-plan-description');
const selectedDesignNote = document.getElementById('selectedDesignNote');
const maintenanceSummaryNote = document.getElementById('maintenanceSummaryNote');
const telefonoInput = document.getElementById('whatsapp');
const workGrid = document.getElementById('workGrid');
const workLinkModal = document.getElementById('workLinkModal');
const confirmWorkLink = document.getElementById('confirmWorkLink');
let pendingWorkUrl = '';

function formatoMoneda(valor) {
  return valor === 0 ? '$ 0' : '$ ' + new Intl.NumberFormat('es-AR').format(valor);
}

function actualizarFrecuencia() {
  const planKey = planSelect.value;
  const hayPlan = Boolean(planKey);
  const opciones = freqSelect.querySelectorAll('option');

  freqSelect.disabled = !hayPlan;

  if (!hayPlan) {
    freqSelect.value = 'sin_mantenimiento';
    if (opciones[0]) opciones[0].textContent = 'Sin mantenimiento';
    return;
  }

  // El mantenimiento es opcional: no obligamos al cliente a contratarlo.
  if (opciones[0]) opciones[0].textContent = 'Sin mantenimiento';
  if (!freqSelect.value) freqSelect.value = 'sin_mantenimiento';
}


function cargarSeleccionDeEditor() {
  try {
    const raw = localStorage.getItem('vexa:designSelection');
    if (!raw) return;
    const selection = JSON.parse(raw);
    const params = new URLSearchParams(window.location.search);
    const planFromUrl = params.get('plan');
    if (planFromUrl && Object.prototype.hasOwnProperty.call(PRECIOS_PLAN, planFromUrl)) planSelect.value = planFromUrl;
    if (selection?.features?.whatsapp && whatsappCheck) whatsappCheck.checked = true;
    if (selection?.features) {
      const socialCount = ['instagram','facebook','tiktok'].filter(key => selection.features[key]).length;
      if (socialCount === 1) redesSelect.value = '1';
      else if (socialCount >= 3) redesSelect.value = '3';
      else if (socialCount === 0) redesSelect.value = '0';
    }
    if (selectedDesignNote) {
      const parts = [];
      if (selection.template) parts.push(`Diseño: ${selection.template}`);
      if (selection.font) parts.push(`Tipografía: ${selection.font}`);
      if (selection.accent) parts.push(`Color: ${selection.accent}`);
      if (parts.length) {
        selectedDesignNote.textContent = parts.join(' · ');
        selectedDesignNote.classList.remove('hidden');
      }
    }
  } catch (error) {
    console.warn('No se pudo cargar la selección visual del editor.', error);
  }
}

function actualizarPlanSeleccionado() {
  const planKey = planSelect.value;
  const nombre = NOMBRES_PLAN[planKey] || 'Todavía no elegiste un plan';
  const descripcion = DESCRIPCIONES_PLAN[planKey] || 'Cuando selecciones una opción, quedará registrada también en la solicitud que recibimos.';

  if (selectedPlanName) selectedPlanName.textContent = nombre;
  if (selectedPlanDescription) selectedPlanDescription.textContent = descripcion;
  if (valPlanName) valPlanName.textContent = planKey ? nombre : 'Sin seleccionar';
  if (valPlanDescription) valPlanDescription.textContent = planKey ? descripcion : 'Elegí una opción para ver el detalle.';
  selectedPlanBox?.classList.toggle('has-plan', Boolean(planKey));
}

function calcularCotizacion() {
  const planKey = planSelect.value;
  const freqKey = freqSelect.value || 'sin_mantenimiento';
  const redesKey = redesSelect.value;
  const tieneWsp = whatsappCheck.checked;
  const tieneLeads = leadsCheck.checked;
  const esAMedida = planKey === 'amedida';

  actualizarPlanSeleccionado();

  const totalPlan = PRECIOS_PLAN[planKey] ?? 0;
  const costoRedes = PRECIOS_REDES[redesKey] ?? 0;
  const costoWsp = tieneWsp ? Number(whatsappCheck.value) : 0;
  const costoLeads = tieneLeads ? Number(leadsCheck.value) : 0;
  const totalAddons = costoRedes + costoWsp + costoLeads;

  let totalMantenimiento = 0;
  if (planKey && freqKey !== 'sin_mantenimiento' && !esAMedida) {
    totalMantenimiento = PRECIOS_MANTENIMIENTO[planKey]?.[freqKey] ?? 0;
  }

  valPlan.textContent = esAMedida ? 'A cotizar' : formatoMoneda(totalPlan);
  valAddons.textContent = formatoMoneda(totalAddons);
  valTotalDesarrollo.textContent = esAMedida
    ? 'A cotizar'
    : formatoMoneda(totalPlan + totalAddons) + ' ARS';

  if (!planKey) {
    lblFreq.textContent = 'SIN MANTENIMIENTO';
  } else if (freqKey === 'sin_mantenimiento') {
    lblFreq.textContent = 'SIN MANTENIMIENTO';
  } else {
    lblFreq.textContent = freqSelect.options[freqSelect.selectedIndex].textContent.split('(')[0].trim();
  }

  if (esAMedida) {
    valMantenimiento.innerHTML = 'A cotizar';
    if (maintenanceSummaryNote) maintenanceSummaryNote.textContent = 'En una web a medida, el mantenimiento se define junto con el alcance del proyecto.';
  } else if (freqKey === 'sin_mantenimiento') {
    valMantenimiento.innerHTML = '$ 0 <small>/mes</small>';
    if (maintenanceSummaryNote) maintenanceSummaryNote.textContent = 'Sin mantenimiento: Vexa no actualizará productos, precios ni contenidos periódicamente.';
  } else {
    valMantenimiento.innerHTML = `${formatoMoneda(totalMantenimiento)} <small>/mes</small>`;
    if (maintenanceSummaryNote) maintenanceSummaryNote.textContent = 'Con mantenimiento, Vexa puede encargarse de actualizar productos, precios y contenidos según la frecuencia elegida.';
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

// CAMBIO: cualquier botón “Elegir este plan” deja el plan ya seleccionado en el formulario.
document.querySelectorAll('.plan-link[data-plan]').forEach(link => {
  link.addEventListener('click', () => {
    const key = link.dataset.plan;
    if (!PRECIOS_PLAN[key] && key !== 'amedida') return;
    planSelect.value = key;
    actualizarFrecuencia();
    calcularCotizacion();
  });
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

function obtenerResumenDisenoEditor() {
  try {
    const selection = JSON.parse(localStorage.getItem('vexa:designSelection') || 'null');
    if (!selection) return 'No se seleccionó una plantilla en el editor visual.';
    const features = selection.features || {};
    const activas = Object.keys(features).filter(key => features[key]).join(', ') || 'Ninguna';
    return [
      `Plantilla: ${selection.template || 'Sin definir'}`,
      `Tipografía: ${selection.font || 'Sin definir'}`,
      `Color: ${selection.accent || 'Sin definir'}`,
      `Productos: ${selection.productLayout || 'Sin definir'}`,
      `Funciones: ${activas}`
    ].join(' | ');
  } catch (_) {
    return 'No se pudo leer la selección visual.';
  }
}

async function enviarSolicitudPorEmail() {
  const planKey = planSelect.value;
  const freqKey = freqSelect.value || 'sin_mantenimiento';
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
    : freqKey === 'sin_mantenimiento'
      ? '$ 0 /mes — sin mantenimiento'
      : formatoMoneda(PRECIOS_MANTENIMIENTO[planKey]?.[freqKey] ?? 0) + ' /mes';
  const telefono = telefonoInput.value.trim();

  const frecuenciaTexto = freqKey === 'sin_mantenimiento'
    ? 'Sin mantenimiento (opcional)'
    : freqSelect.options[freqSelect.selectedIndex]?.textContent ?? '';

  const datos = {
    _subject: `💻 Nueva solicitud Vexa — ${NOMBRES_PLAN[planKey] || 'Plan a definir'} — ${document.getElementById('nombreNegocio').value}`,
    _template: 'box',
    _captcha: 'false',

    '━━━━━━━━ PLAN Y PROYECTO ━━━━━━━━': '',
    'Plan elegido': NOMBRES_PLAN[planKey] ?? planKey,
    'Qué incluye ese plan': DESCRIPCIONES_PLAN[planKey] ?? '',
    'Nombre del emprendimiento': document.getElementById('nombreNegocio').value,
    'Público objetivo': document.getElementById('publicoObjetivo').value,
    'Diseño visual seleccionado': obtenerResumenDisenoEditor(),
    '━━━━━━━━ CONTACTO ━━━━━━━━': '',
    'WhatsApp / Teléfono': telefono,
    '━━━━━━━━ ADICIONALES ━━━━━━━━': '',
    'Redes sociales': redesSelect.options[redesSelect.selectedIndex]?.textContent ?? 'Ninguna',
    'Botón de WhatsApp adicional': tieneWsp ? 'Sí (+$8.000)' : 'No',
    'Formulario de consultas': tieneLeads ? 'Sí (+$20.000)' : 'No',
    '━━━━━━━━ INVERSIÓN ━━━━━━━━': '',
    'Desarrollo de la web': planKey === 'amedida' ? 'A cotizar' : formatoMoneda(totalPlan) + ' ARS',
    'Adicionales': formatoMoneda(totalAddons) + ' ARS',
    'TOTAL INICIAL': totalDesarrollo,
    'Mantenimiento': frecuenciaTexto,
    'Cuota mensual de mantenimiento': mantenimiento,
    'Nota mantenimiento': freqKey === 'sin_mantenimiento'
      ? 'Sin mantenimiento no se pueden actualizar productos, precios ni contenidos de forma periódica.'
      : 'Mantenimiento contratado: permite solicitar actualizaciones según la frecuencia elegida.'
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


/* =========================================================
   PORTAFOLIO — AGREGÁ TUS LINKS DE CLIENTES ACÁ
   ---------------------------------------------------------
   IMPORTANTE: este es el lugar principal que tenés que editar.
   Cambiá solamente `url` por la URL real de cada web publicada.
   Ejemplo: url: 'https://mi-cliente.com'
   Podés cambiar nombre, categoría y descripción libremente.
   ========================================================= */
const TRABAJOS_CLIENTES = [
  { name: 'Proyecto Cliente 01', category: 'Tienda Online', description: 'Ejemplo de tienda publicada con catálogo y compra.', url: '' },
  { name: 'Proyecto Cliente 02', category: 'Catálogo', description: 'Ejemplo de catálogo visual para mostrar productos.', url: '' },
  { name: 'Proyecto Cliente 03', category: 'Página Negocio', description: 'Ejemplo de web institucional para servicios.', url: '' },
  { name: 'Proyecto Cliente 04', category: 'Web Premium', description: 'Ejemplo de una experiencia más completa y visual.', url: '' },
  { name: 'Proyecto Cliente 05', category: 'Tienda Online Pro', description: 'Ejemplo con funcionalidades avanzadas de e-commerce.', url: '' },
  { name: 'Proyecto Cliente 06', category: 'A medida', description: 'Ejemplo de proyecto personalizado para una marca.', url: '' }
];

function renderTrabajosClientes() {
  if (!workGrid) return;
  workGrid.innerHTML = TRABAJOS_CLIENTES.map((trabajo, index) => `
    <article class="work-card">
      <div class="work-card-visual work-visual-${(index % 4) + 1}">
        <span class="work-browser-dot"></span><span class="work-browser-dot"></span><span class="work-browser-dot"></span>
        <div class="work-visual-screen"><b>${escapeHtml(trabajo.category)}</b><small>Proyecto ${String(index + 1).padStart(2, '0')}</small></div>
      </div>
      <div class="work-card-body">
        <span class="work-category">${escapeHtml(trabajo.category)}</span>
        <h3>${escapeHtml(trabajo.name)}</h3>
        <p>${escapeHtml(trabajo.description)}</p>
        <button type="button" class="work-link-button" data-work-url="${escapeHtml(trabajo.url || '')}" data-work-name="${escapeHtml(trabajo.name)}">${trabajo.url ? 'Ver web publicada ↗' : 'Agregar link →'}</button>
      </div>
    </article>
  `).join('');

  workGrid.querySelectorAll('[data-work-url]').forEach(button => {
    button.addEventListener('click', () => {
      const url = button.dataset.workUrl;
      if (!url) {
        alert('Todavía no hay un link cargado para este proyecto.\n\nBuscá TRABAJOS_CLIENTES en script.js y completá el campo `url`.');
        return;
      }
      pendingWorkUrl = url;
      if (workLinkModal) {
        workLinkModal.classList.remove('hidden');
        document.body.classList.add('modal-open');
      }
    });
  });
}

function cerrarModalTrabajos() {
  workLinkModal?.classList.add('hidden');
  document.body.classList.remove('modal-open');
  pendingWorkUrl = '';
}

document.querySelectorAll('[data-close-work-modal]').forEach(el => el.addEventListener('click', cerrarModalTrabajos));
confirmWorkLink?.addEventListener('click', () => {
  if (pendingWorkUrl) window.open(pendingWorkUrl, '_blank', 'noopener,noreferrer');
  cerrarModalTrabajos();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') cerrarModalTrabajos();
});
