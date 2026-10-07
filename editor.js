/* =========================================================
   VEXA — EDITOR VISUAL SIN SERVIDOR
   ---------------------------------------------------------
   IMPORTANTE PARA VOS:
   - Los precios adicionales se cambian en EXTRA_PRICES.
   - Las reglas de cada plan se cambian en PLAN_RULES.
   - Las 4 plantillas de cada plan se definen en PLAN_TEMPLATES.
   Así podés ajustar el negocio sin tocar el motor visual.
   ========================================================= */

const PLAN_PRICES = {
  inicio: 30000, negocio: 40000, catalogo: 50000, catalogoplus: 60000,
  dinamica: 70000, tienda: 85000, tiendapro: 100000, amedida: 0
};

const PLAN_NAMES = {
  inicio: 'Página Inicial', negocio: 'Página Negocio', catalogo: 'Catálogo', catalogoplus: 'Catálogo Plus',
  dinamica: 'Web Dinámica', tienda: 'Tienda Online', tiendapro: 'Tienda Online Pro', amedida: 'A medida'
};

/* EDITÁ ESTOS VALORES CUANDO QUIERAS CAMBIAR LA INVERSIÓN DE CADA EXTRA. */
const EXTRA_PRICES = {
  instagram: 5000,
  facebook: 5000,
  tiktok: 5000,
  whatsapp: 8000,
  search: 7000,
  dynamicImages: 9000,
  sidebarProducts: 4000,
  leadForm: 20000
};

/*
  Reglas comerciales del editor.
  included=true -> el cliente puede activarlo sin sumar dinero porque forma parte de ese plan.
  allowed=false -> queda bloqueado para ese plan y explicamos el motivo.
  Para redes usamos maxSocials: Página Inicial permite hasta 2.
*/
const PLAN_RULES = {
  inicio: {
    maxSocials: 2,
    products: true, productSidebar: false,
    features: {
      whatsapp: { allowed: true, included: false }, instagram: { allowed: true, included: false }, facebook: { allowed: true, included: false }, tiktok: { allowed: true, included: false },
      cart: { allowed: false, reason: 'No disponible en Página Inicial' }, search: { allowed: false, reason: 'No disponible en este plan' }, dynamicImages: { allowed: false, reason: 'Requiere un plan de catálogo avanzado o tienda' }, leadForm: { allowed: true, included: false }
    }
  },
  negocio: {
    maxSocials: 3,
    products: true, productSidebar: false,
    features: {
      whatsapp: { allowed: true, included: false }, instagram: { allowed: true, included: false }, facebook: { allowed: true, included: false }, tiktok: { allowed: true, included: false },
      cart: { allowed: false, reason: 'El carrito pertenece a los planes de tienda' }, search: { allowed: false, reason: 'No disponible en este plan' }, dynamicImages: { allowed: false, reason: 'Requiere un plan de catálogo avanzado o tienda' }, leadForm: { allowed: true, included: false }
    }
  },
  catalogo: {
    maxSocials: 3,
    products: true, productSidebar: false,
    features: {
      whatsapp: { allowed: true, included: false }, instagram: { allowed: true, included: false }, facebook: { allowed: true, included: false }, tiktok: { allowed: true, included: false },
      cart: { allowed: false, reason: 'Catálogo: muestra productos, no compra online' }, search: { allowed: false, reason: 'Buscador disponible desde Catálogo Plus' }, dynamicImages: { allowed: false, reason: 'Imágenes dinámicas disponibles desde Catálogo Plus' }, leadForm: { allowed: true, included: false }
    }
  },
  catalogoplus: {
    maxSocials: 3,
    products: true, productSidebar: true,
    features: {
      whatsapp: { allowed: true, included: false }, instagram: { allowed: true, included: false }, facebook: { allowed: true, included: false }, tiktok: { allowed: true, included: false },
      cart: { allowed: false, reason: 'El carrito pertenece a los planes de tienda' }, search: { allowed: true, included: false }, dynamicImages: { allowed: true, included: false }, leadForm: { allowed: true, included: false }
    }
  },
  dinamica: {
    maxSocials: 3,
    products: true, productSidebar: true,
    features: {
      whatsapp: { allowed: true, included: false }, instagram: { allowed: true, included: false }, facebook: { allowed: true, included: false }, tiktok: { allowed: true, included: false },
      cart: { allowed: false, reason: 'El carrito pertenece a los planes de tienda' }, search: { allowed: true, included: false }, dynamicImages: { allowed: false, reason: 'Imágenes dinámicas disponibles en Catálogo Plus y Tiendas' }, leadForm: { allowed: true, included: false }
    }
  },
  tienda: {
    maxSocials: 3,
    products: true, productSidebar: true,
    features: {
      whatsapp: { allowed: true, included: true }, instagram: { allowed: true, included: true }, facebook: { allowed: true, included: false }, tiktok: { allowed: true, included: false },
      cart: { allowed: true, included: true }, search: { allowed: true, included: true }, dynamicImages: { allowed: false, reason: 'Disponible en Tienda Online Pro' }, leadForm: { allowed: true, included: false }
    }
  },
  tiendapro: {
    maxSocials: 3,
    products: true, productSidebar: true,
    features: {
      whatsapp: { allowed: true, included: true }, instagram: { allowed: true, included: true }, facebook: { allowed: true, included: true }, tiktok: { allowed: true, included: true },
      cart: { allowed: true, included: true }, search: { allowed: true, included: true }, dynamicImages: { allowed: true, included: true }, leadForm: { allowed: true, included: true }
    }
  },
  amedida: {
    maxSocials: 4,
    products: true, productSidebar: true,
    features: {
      whatsapp: { allowed: true, included: false }, instagram: { allowed: true, included: false }, facebook: { allowed: true, included: false }, tiktok: { allowed: true, included: false },
      cart: { allowed: true, included: false }, search: { allowed: true, included: false }, dynamicImages: { allowed: true, included: false }, leadForm: { allowed: true, included: false }
    }
  }
};

const PLAN_TEMPLATES = {
  inicio: [
    { id:'inicio-1', name:'Centro', note:'Hero centrado y simple', layout:'centered' },
    { id:'inicio-2', name:'Split', note:'Texto + imagen', layout:'split' },
    { id:'inicio-3', name:'Impacto', note:'Título protagonista', layout:'reverse' },
    { id:'inicio-4', name:'Bento', note:'Bloques visuales', layout:'bento' }
  ],
  negocio: [
    { id:'negocio-1', name:'Servicios', note:'Tres servicios al frente', layout:'split' },
    { id:'negocio-2', name:'Marca', note:'Presentación institucional', layout:'centered' },
    { id:'negocio-3', name:'Confianza', note:'Stats + beneficios', layout:'bento' },
    { id:'negocio-4', name:'Proceso', note:'Paso a paso visual', layout:'reverse' }
  ],
  catalogo: [
    { id:'catalogo-1', name:'Grilla', note:'Productos como protagonistas', layout:'split' },
    { id:'catalogo-2', name:'Editorial', note:'Imagen grande + colección', layout:'centered' },
    { id:'catalogo-3', name:'Promo', note:'Oferta y catálogo', layout:'reverse' },
    { id:'catalogo-4', name:'Colección', note:'Marca + productos', layout:'bento' }
  ],
  catalogoplus: [
    { id:'catalogoplus-1', name:'Colecciones', note:'Categorías visibles', layout:'bento' },
    { id:'catalogoplus-2', name:'Explorar', note:'Buscador + catálogo', layout:'split' },
    { id:'catalogoplus-3', name:'Editorial', note:'Producto con narrativa', layout:'centered' },
    { id:'catalogoplus-4', name:'Lateral', note:'Categorías a la izquierda', layout:'reverse' }
  ],
  dinamica: [
    { id:'dinamica-1', name:'Acción', note:'CTA y recorrido rápido', layout:'split' },
    { id:'dinamica-2', name:'Flujo', note:'Proceso visual', layout:'bento' },
    { id:'dinamica-3', name:'Agenda', note:'Servicios + contacto', layout:'centered' },
    { id:'dinamica-4', name:'Pro', note:'Secciones modulares', layout:'reverse' }
  ],
  tienda: [
    { id:'tienda-1', name:'Store', note:'Compra rápida', layout:'split' },
    { id:'tienda-2', name:'Magazine', note:'Marca + productos', layout:'centered' },
    { id:'tienda-3', name:'Oferta', note:'Promos protagonistas', layout:'reverse' },
    { id:'tienda-4', name:'Shop Max', note:'Más contenido comercial', layout:'bento' }
  ],
  tiendapro: [
    { id:'tiendapro-1', name:'Premium', note:'Producto protagonista', layout:'split' },
    { id:'tiendapro-2', name:'Showcase', note:'Visual de alto impacto', layout:'centered' },
    { id:'tiendapro-3', name:'Editorial Pro', note:'Marca + colección', layout:'reverse' },
    { id:'tiendapro-4', name:'Commerce Max', note:'Todo el ecosistema', layout:'bento' }
  ],
  amedida: [
    { id:'amedida-1', name:'Concept', note:'Base experimental', layout:'centered' },
    { id:'amedida-2', name:'Studio', note:'Presentación premium', layout:'split' },
    { id:'amedida-3', name:'Immersive', note:'Composición visual', layout:'bento' },
    { id:'amedida-4', name:'Unique', note:'Experiencia única', layout:'reverse' }
  ]
};

const FEATURES = [
  {key:'whatsapp', label:'WhatsApp', desc:'Botón de contacto directo'},
  {key:'instagram', label:'Instagram', desc:'Botón / enlace a Instagram'},
  {key:'facebook', label:'Facebook', desc:'Botón / enlace a Facebook'},
  {key:'tiktok', label:'TikTok', desc:'Botón / enlace a TikTok'},
  {key:'cart', label:'Carrito', desc:'Compra y resumen del pedido'},
  {key:'search', label:'Buscador', desc:'Buscar productos o contenido'},
  {key:'dynamicImages', label:'Imágenes dinámicas', desc:'Cambian al pasar el cursor'},
  {key:'leadForm', label:'Formulario de consultas', desc:'Recibí datos de personas interesadas'}
];

const DEFAULTS = {
  businessName:'Tu negocio', heroTitle:'Una presencia que hace crecer tu negocio',
  heroDescription:'Presentá tus productos o servicios con una web clara, moderna y pensada para convertir visitas en consultas.',
  accent:'#00d2ff', theme:'light', font:'Inter', productLayout:'grid', device:'desktop',
  features:{whatsapp:false,instagram:false,facebook:false,tiktok:false,cart:false,search:false,dynamicImages:false,leadForm:false}
};

function readPlan(){
  const params = new URLSearchParams(window.location.search);
  const key = params.get('plan');
  return PLAN_RULES[key] ? key : 'inicio';
}

let currentPlan = readPlan();
function cloneDefaults(){ return JSON.parse(JSON.stringify(DEFAULTS)); }

let state = cloneDefaults();
let currentTemplateIndex = 0;
const planTemplatesFor = plan => PLAN_TEMPLATES[plan] || PLAN_TEMPLATES.inicio;
let planTemplates = planTemplatesFor(currentPlan);

const el = id => document.getElementById(id);
const previewSite = el('previewSite');
const previewFrame = el('previewFrame');
const templatePicker = el('templatePicker');
const featureList = el('featureList');
const productLayoutNote = el('productLayoutNote');
const summaryChips = el('summaryChips');
const editorPrice = el('editorPrice');
const editorToast = el('editorToast');
const planSelectEditor = el('planSelectEditor');

function money(value){
  return value === 0 ? '$ 0' : '$ ' + new Intl.NumberFormat('es-AR').format(value);
}
function escapeHtml(value){
  return String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}
function hexWithAlpha(hex, alpha='24') { return `${hex}${alpha}`; }
function toast(message){
  editorToast.textContent = message;
  editorToast.style.display = 'block';
  clearTimeout(window.__vexaToast);
  window.__vexaToast = setTimeout(()=>editorToast.style.display='none',2600);
}
function planRule(){return PLAN_RULES[currentPlan] || PLAN_RULES.inicio;}
function featureRule(key){return planRule().features[key] || {allowed:false,reason:'No disponible en este plan'};}

function renderPlanSelect(){
  if(!planSelectEditor) return;
  planSelectEditor.innerHTML = Object.entries(PLAN_NAMES).map(([key,name]) => `<option value="${key}">${escapeHtml(name)}</option>`).join('');
  planSelectEditor.value = currentPlan;
}

function resetStateForPlan(){
  state = cloneDefaults();
  currentTemplateIndex = 0;
  planTemplates = planTemplatesFor(currentPlan);
  const defaults = {
    tienda: {whatsapp:true, instagram:true, cart:true, search:true},
    tiendapro: {whatsapp:true, instagram:true, cart:true, search:true, dynamicImages:true}
  };
  Object.assign(state.features, defaults[currentPlan] || {});
}

function renderTemplatePicker(){
  templatePicker.innerHTML = planTemplates.map((tpl,i)=>`
    <button type="button" class="template-btn ${i===currentTemplateIndex?'active':''}" data-template-index="${i}">
      <strong>${escapeHtml(tpl.name)}</strong>
      <span>${escapeHtml(tpl.note)}</span>
      <b>${String(i+1).padStart(2,'0')}</b>
    </button>`).join('');
  templatePicker.querySelectorAll('[data-template-index]').forEach(btn=>btn.addEventListener('click',()=>{
    currentTemplateIndex = Number(btn.dataset.templateIndex);
    renderTemplatePicker();
    renderPreview();
  }));
}

function renderFeatureList(){
  const rule = planRule();
  const socialKeys = ['instagram','facebook','tiktok'];
  const socialSelected = socialKeys.filter(k=>state.features[k]).length;
  featureList.innerHTML = FEATURES.map(feature=>{
    const config = featureRule(feature.key);
    const locked = !config.allowed;
    const checked = !!state.features[feature.key];
    const included = !!config.included;
    const price = included ? 'Incluido' : `+${money(EXTRA_PRICES[feature.key] || 0)}`;
    return `
      <label class="switch-item ${locked?'locked':''}" title="${locked?escapeHtml(config.reason):''}">
        <span class="switch-copy"><strong>${escapeHtml(feature.label)}${included?'<span class="switch-badge">INCLUIDO</span>':''}</strong><small>${escapeHtml(locked?config.reason:feature.desc)}</small></span>
        <span class="switch-price">${locked?'Bloqueado':price}</span>
        <span class="switch-control">
          <input type="checkbox" data-feature="${feature.key}" ${checked?'checked':''} ${locked?'disabled':''}>
          <span class="switch-ui"></span>
        </span>
      </label>`;
  }).join('');

  featureList.querySelectorAll('[data-feature]').forEach(input=>input.addEventListener('change',()=>{
    const key = input.dataset.feature;
    const social = socialKeys.includes(key);
    if (social && input.checked) {
      const max = rule.maxSocials ?? 3;
      const now = socialKeys.filter(k=>state.features[k]).length;
      if (now > max) {
        input.checked = false;
        toast(`Este plan permite hasta ${max} redes sociales.`);
        return;
      }
    }
    state.features[key] = input.checked;
    renderFeatureList();
    renderPreview();
    updateSummary();
    persist(false);
  }));
}

function updateProductLayoutUI(){
  const allowedSidebar = planRule().productSidebar;
  document.querySelectorAll('[data-product-layout]').forEach(btn=>{
    const wantsSidebar = btn.dataset.productLayout === 'sidebar';
    btn.classList.toggle('active', state.productLayout === btn.dataset.productLayout);
    if (wantsSidebar && !allowedSidebar) {
      btn.disabled = true; btn.title = 'Este formato se habilita en planes de catálogo avanzado, dinámica o tienda.'; btn.style.opacity='.42';
    } else { btn.disabled=false; btn.style.opacity='1'; btn.title=''; }
  });
  productLayoutNote.textContent = allowedSidebar
    ? `Podés elegir entre cuadrícula y barra lateral. La barra lateral suma ${money(EXTRA_PRICES.sidebarProducts)}.`
    : 'En este plan los productos se muestran únicamente en cuadrícula.';
}

function renderControls(){
  renderPlanSelect();
  el('planPill').textContent = PLAN_NAMES[currentPlan];
  el('businessName').value = state.businessName;
  el('heroTitle').value = state.heroTitle;
  el('heroDescription').value = state.heroDescription;
  el('accentColor').value = state.accent;
  el('accentHex').textContent = state.accent.toUpperCase();
  el('fontFamily').value = state.font;
  document.querySelectorAll('[data-theme]').forEach(btn=>btn.classList.toggle('active',btn.dataset.theme===state.theme));
  renderTemplatePicker(); renderFeatureList(); updateProductLayoutUI();
}

function productArea(){
  const commerce = ['catalogo','catalogoplus','tienda','tiendapro','amedida'].includes(currentPlan);
  const showProducts = planRule().products && commerce;
  if(!showProducts) return '';
  const canCart = state.features.cart;
  const canSearch = state.features.search;
  const dynamic = state.features.dynamicImages;
  const layout = state.productLayout;
  const products = [1,2,3,4,5,6].map(i=>`
    <article class="product-card ${dynamic?'dynamic':''}" ${dynamic?'tabindex="0" aria-label="Producto con imagen dinámica"':''}>
      <div class="product-image">
        <div class="product-tag">${i===1?'NUEVO':'DESTACADO'}</div>
        <div class="product-art main"><span></span></div>
        <div class="product-art alt"><span style="transform:rotate(10deg) scale(.86)"></span></div>
      </div>
      <h4>Producto ${String(i).padStart(2,'0')}</h4>
      <p>${canSearch?'Colección · categoría':'Detalle del producto'}</p>
      <div class="product-bottom"><span class="product-price">$ ${i===1?'24.900':'18.500'}</span>${canCart?`<button type="button" class="buy-mini filled">Comprar</button>`:`<button type="button" class="buy-mini">Consultar</button>`}</div>
    </article>`).join('');
  return `<section class="content-band product-section">
    <div class="products-layout ${layout}">
      ${layout==='sidebar'?`<aside class="products-filter"><strong>Categorías</strong><span class="active">Todos</span><span>Novedades</span><span>Destacados</span><span>Ofertas</span></aside>`:''}
      <div class="products-list">
        <div style="display:flex;justify-content:space-between;align-items:end;gap:10px;margin-bottom:10px">
          <div><h3 style="margin:0">${currentPlan==='catalogo'?'Catálogo':currentPlan==='tiendapro'?'Tienda online':'Productos'}</h3>${canSearch?'<div style="margin-top:4px;color:var(--site-muted);font-size:7px">⌕ Buscar productos</div>':''}</div>
          ${canCart?'<div class="site-feature-ribbon" style="margin:0;padding:7px 9px"><strong>🛒 3 productos</strong><span>Mi carrito</span></div>':''}
        </div>
        <div class="site-grid cols-3">${products.slice(0, layout==='sidebar'?4:6)}</div>
      </div>
    </div>
    ${dynamic?'<div class="site-feature-ribbon"><strong>↔ Imágenes dinámicas</strong><span>Pasá el cursor por un producto para ver otra vista.</span></div>':''}
  </section>`;
}

function servicesSection(){
  if(['inicio','catalogo','catalogoplus','tienda','tiendapro'].includes(currentPlan)) return '';
  return `<section class="content-band"><h3>Cómo te ayuda la web</h3><div class="site-grid cols-3">
    <div class="info-card"><strong>Presentación</strong><span>Una propuesta clara para entender tu negocio.</span></div>
    <div class="info-card"><strong>Confianza</strong><span>Espacios para destacar experiencia y beneficios.</span></div>
    <div class="info-card"><strong>Acción</strong><span>Botones y recorridos pensados para generar consultas.</span></div>
  </div></section>`;
}

function heroMarkup(template){
  const layout = template.layout;
  const formClass = `layout-${layout}`;
  return `<section class="site-hero ${formClass}">
    <div class="hero-copy">
      <div style="display:inline-flex;align-items:center;gap:6px;color:var(--site-accent);font-size:7px;font-weight:800;letter-spacing:.14em">VEXA / ${escapeHtml(PLAN_NAMES[currentPlan].toUpperCase())}</div>
      <h2>${escapeHtml(state.heroTitle)}</h2>
      <p>${escapeHtml(state.heroDescription)}</p>
      <div class="hero-actions"><span class="site-btn">Quiero empezar</span><span class="site-link-btn">Conocer más →</span></div>
    </div>
    <div class="hero-art" aria-hidden="true"></div>
  </section>`;
}

function renderPreview(){
  const template = planTemplates[currentTemplateIndex] || planTemplates[0];
  previewSite.className = `preview-site theme-${state.theme} font-${state.font.replace(/\s+/g,'-')}`;
  previewSite.style.setProperty('--site-accent', state.accent);
  previewSite.innerHTML = `
    <div class="preview-canvas">
      <header class="site-nav">
        <strong class="site-brand">${escapeHtml(state.businessName.toUpperCase())}</strong>
        <nav class="site-nav-links"><span>Inicio</span><span>${['catalogo','catalogoplus','tienda','tiendapro'].includes(currentPlan)?'Productos':'Servicios'}</span><span>Contacto</span></nav>
        <div class="site-nav-tools">
          ${state.features.search?'<span class="site-icon">⌕</span>':''}
          ${state.features.cart?'<span class="site-icon">🛒</span>':''}
        </div>
      </header>
      ${heroMarkup(template)}
      ${servicesSection()}
      ${productArea()}
      ${state.features.leadForm ? `<section class="content-band lead-form-preview"><div class="lead-preview-box"><div><span class="site-kicker">CONTACTO</span><h3>Hablemos sobre tu proyecto</h3><p>Un formulario de consultas visible en la web para recibir datos de personas interesadas.</p></div><div class="lead-preview-fields"><span>Nombre</span><span>WhatsApp / Email</span><span class="lead-preview-button">Enviar consulta</span></div></div></section>` : ''}
      <section class="content-band">
        <div class="site-feature-ribbon"><strong>${escapeHtml(template.name)} · ${escapeHtml(PLAN_NAMES[currentPlan])}</strong><span>Tu selección visual, lista para programar.</span></div>
      </section>
      <footer class="site-footer-preview"><span>© ${new Date().getFullYear()} ${escapeHtml(state.businessName)}</span><span>Referencia visual Vexa</span></footer>
      <div class="floating-actions">
        ${state.features.whatsapp?'<span class="float-btn float-wa">WA</span>':''}
        ${state.features.instagram?'<span class="float-btn float-ig" aria-label="Instagram">IG</span>':''}
        ${state.features.facebook?'<span class="float-btn float-fb" aria-label="Facebook">f</span>':''}
        ${state.features.tiktok?'<span class="float-btn float-tt" aria-label="TikTok">TT</span>':''}
      </div>
    </div>`;
}

function calculatePrice(){
  if(currentPlan==='amedida') return null;
  let total = PLAN_PRICES[currentPlan];
  const rule = planRule();
  Object.keys(state.features).forEach(key=>{
    if(!state.features[key]) return;
    const config = rule.features[key];
    if(config?.included) return;
    total += EXTRA_PRICES[key] || 0;
  });
  if(state.productLayout==='sidebar' && rule.productSidebar) total += EXTRA_PRICES.sidebarProducts || 0;
  return total;
}

function updateSummary(){
  const price = calculatePrice();
  editorPrice.textContent = price === null ? 'A cotizar' : money(price) + ' ARS';
  const template = planTemplates[currentTemplateIndex] || planTemplates[0];
  const chips = [PLAN_NAMES[currentPlan], `Plantilla: ${template.name}`, `Tipografía: ${state.font}`, `Fondo: ${state.theme}`];
  Object.entries(state.features).forEach(([key,on])=>{ if(on) chips.push(FEATURES.find(f=>f.key===key)?.label || key); });
  if(state.productLayout==='sidebar') chips.push('Productos: barra lateral');
  else if(['catalogo','catalogoplus','tienda','tiendapro','amedida'].includes(currentPlan)) chips.push('Productos: cuadrícula');
  summaryChips.innerHTML = chips.map(chip=>`<span class="summary-chip">${escapeHtml(chip)}</span>`).join('');
}

function renderPreviewAndSummary(){ renderPreview(); updateSummary(); }

function persist(showMessage=true){
  localStorage.setItem('vexa:editorSelection', JSON.stringify({plan:currentPlan,templateIndex:currentTemplateIndex,state}));
  if(showMessage) toast('Diseño guardado en este dispositivo.');
}
function restore(){
  try{
    const raw = localStorage.getItem('vexa:editorSelection');
    if(!raw) return;
    const saved = JSON.parse(raw);
    if(saved?.plan===currentPlan && saved.state){
      state = Object.assign(cloneDefaults(), saved.state, {features:Object.assign(cloneDefaults().features,saved.state.features)});
      currentTemplateIndex = Math.min(Number(saved.templateIndex)||0, planTemplates.length-1);
    }
  }catch(error){ console.warn('No se pudo restaurar el diseño',error); }
}

function buildDesignSelection(){
  const template = planTemplates[currentTemplateIndex] || planTemplates[0];
  const featureDetails = FEATURES.map(feature => {
    const config = featureRule(feature.key);
    const selected = !!state.features[feature.key];
    const included = !!config.included;
    const price = (!selected || included) ? 0 : (EXTRA_PRICES[feature.key] || 0);
    return {
      key: feature.key,
      label: feature.label,
      selected,
      included,
      allowed: !!config.allowed,
      price,
      status: !config.allowed ? 'Bloqueado' : included ? 'Incluido' : selected ? 'Adicional' : 'No seleccionado'
    };
  });
  const sidebarSelected = state.productLayout === 'sidebar' && planRule().productSidebar;
  return {
    plan: currentPlan,
    planName: PLAN_NAMES[currentPlan],
    planPrice: currentPlan === 'amedida' ? null : PLAN_PRICES[currentPlan],
    template: template.name,
    templateId: template.id,
    businessName: state.businessName,
    heroTitle: state.heroTitle,
    heroDescription: state.heroDescription,
    accent: state.accent,
    theme: state.theme,
    font: state.font,
    productLayout: state.productLayout,
    sidebarProducts: sidebarSelected,
    sidebarProductsPrice: sidebarSelected ? EXTRA_PRICES.sidebarProducts : 0,
    featureDetails,
    features: {...state.features},
    estimated: calculatePrice()
  };
}

function sendToQuote(){
  const selection = buildDesignSelection();
  localStorage.setItem('vexa:designSelection', JSON.stringify(selection));
  openQuoteModal(selection);
}

const quoteModal = el('designQuoteModal');
const quoteForm = el('designQuoteForm');
const quotePlan = el('designQuotePlan');
const quoteInvestment = el('designQuoteInvestment');
const quoteFeatures = el('designQuoteFeatures');
const quoteMaintenance = el('designQuoteMaintenance');
const quoteCloseButtons = document.querySelectorAll('[data-close-design-quote]');
const quoteStatus = el('designQuoteStatus');
const quoteSubmit = el('designQuoteSubmit');
const quoteEmailInput = el('designClientEmail');
const quoteContactInput = el('designClientContact');
const quoteCompanyInput = el('designClientCompany');
const quotePhoneInput = el('designClientPhone');
const quoteMessageInput = el('designClientMessage');

const EMAIL_EMPRESA = 'xenastudiopage@gmail.com';
const FORM_SUBMIT_URL = `https://formsubmit.co/ajax/${EMAIL_EMPRESA}`;

const MAINTENANCE_PRICES = {
  inicio: { mensual: 10000, quincenal: 15000, semanal: 25000 },
  negocio: { mensual: 12000, quincenal: 18000, semanal: 30000 },
  catalogo: { mensual: 20000, quincenal: 35000, semanal: 60000 },
  catalogoplus: { mensual: 25000, quincenal: 40000, semanal: 70000 },
  dinamica: { mensual: 30000, quincenal: 50000, semanal: 80000 },
  tienda: { mensual: 35000, quincenal: 60000, semanal: 90000 },
  tiendapro: { mensual: 40000, quincenal: 70000, semanal: 100000 },
  amedida: { mensual: 0, quincenal: 0, semanal: 0 }
};

function maintenanceLabel(value){
  return {
    sin_mantenimiento:'Sin mantenimiento',
    mensual:'Mensual',
    quincenal:'Quincenal',
    semanal:'Semanal'
  }[value] || 'Sin mantenimiento';
}
function maintenancePrice(value, plan){
  if(value === 'sin_mantenimiento') return 0;
  if(plan === 'amedida') return null;
  return MAINTENANCE_PRICES[plan]?.[value] ?? 0;
}
function featurePriceText(detail){
  if(!detail.selected) return 'No seleccionado';
  if(detail.included) return 'Incluido en el plan';
  return '+ ' + money(detail.price);
}
function openQuoteModal(selection){
  if(!quoteModal) return;
  quoteForm?.reset();
  quotePlan.textContent = `${selection.planName} · ${selection.template}`;
  quoteCompanyInput.value = selection.businessName || '';
  quoteInvestment.textContent = selection.estimated === null ? 'A cotizar' : money(selection.estimated) + ' ARS';
  quoteFeatures.innerHTML = selection.featureDetails
    .filter(item => item.selected || item.allowed)
    .map(item => `<div class="quote-feature-row ${item.selected?'selected':'muted'}">
      <span><strong>${escapeHtml(item.label)}</strong><small>${escapeHtml(item.status)}</small></span>
      <b>${escapeHtml(featurePriceText(item))}</b>
    </div>`).join('');
  quoteMaintenance.value = 'sin_mantenimiento';
  updateQuoteMaintenancePreview();
  quoteStatus.className = 'quote-send-status';
  quoteStatus.textContent = '';
  quoteSubmit.disabled = false;
  quoteSubmit.textContent = 'Enviar a Vexa';
  quoteModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  setTimeout(()=>quoteContactInput?.focus(),80);
}
function updateQuoteMaintenancePreview(){
  const value = quoteMaintenance.value;
  const price = maintenancePrice(value, currentPlan);
  const label = maintenanceLabel(value);
  if(!quoteMaintenance) return;
  const note = el('designQuoteMaintenanceNote');
  if(!note) return;
  if(value === 'sin_mantenimiento'){
    note.textContent = 'Sin mantenimiento no se pueden actualizar productos, precios ni contenidos de forma periódica.';
  } else if(price === null){
    note.textContent = `${label}: el mantenimiento para una web a medida se define junto con el alcance.`;
  } else {
    note.textContent = `${label}: ${money(price)} /mes. Permite solicitar actualizaciones según la frecuencia elegida.`;
  }
}
function closeQuoteModal(){
  quoteModal?.classList.add('hidden');
  document.body.classList.remove('modal-open');
}
quoteCloseButtons.forEach(btn => btn.addEventListener('click', closeQuoteModal));
quoteModal?.querySelector('[data-design-quote-backdrop]')?.addEventListener('click', closeQuoteModal);
quoteMaintenance?.addEventListener('change', updateQuoteMaintenancePreview);

document.addEventListener('keydown', event => {
  if(event.key === 'Escape' && quoteModal && !quoteModal.classList.contains('hidden')) closeQuoteModal();
});

function formatFeatureList(selection){
  const selected = selection.featureDetails.filter(item=>item.selected);
  const rows = selected.length ? selected.map(item=>`• ${item.label}: ${item.included ? 'Incluido en el plan' : '+ ' + money(item.price)}`).join('\n') : '• Ninguna función adicional seleccionada.';
  const layout = selection.productLayout === 'sidebar'
    ? `\n• Productos en barra lateral: + ${money(EXTRA_PRICES.sidebarProducts)}`
    : `\n• Productos en cuadrícula: Incluido`;
  return rows + layout;
}

function buildQuoteEmailData(selection){
  const maintenanceKey = quoteMaintenance.value;
  const maintenanceCost = maintenancePrice(maintenanceKey, selection.plan);
  const featureExtras = selection.featureDetails.filter(item=>item.selected && !item.included);
  const featureIncluded = selection.featureDetails.filter(item=>item.selected && item.included);
  const extrasTotal = featureExtras.reduce((sum,item)=>sum + item.price,0) + (selection.sidebarProducts ? EXTRA_PRICES.sidebarProducts : 0);
  const estimatedInitial = selection.plan === 'amedida' ? 'A cotizar' : money(selection.planPrice + extrasTotal) + ' ARS';

  const datos = {
    _subject: `🎨 VEXA — Nueva cotización desde editor — ${selection.planName} — ${quoteCompanyInput.value.trim() || selection.businessName}`,
    _template: 'box',
    _captcha: 'false',
    _replyto: quoteEmailInput.value.trim() || undefined,

    '━━━━━━━━ DATOS DEL CLIENTE ━━━━━━━━': '',
    'Nombre de contacto': quoteContactInput.value.trim(),
    'Empresa / emprendimiento': quoteCompanyInput.value.trim(),
    'WhatsApp / Teléfono': quotePhoneInput.value.trim(),
    'Correo electrónico': quoteEmailInput.value.trim() || 'No informado',
    'Mensaje adicional': quoteMessageInput.value.trim() || 'Sin mensaje adicional',

    '━━━━━━━━ PLAN ELEGIDO ━━━━━━━━': '',
    'Plan': selection.planName,
    'Valor base del plan': selection.plan === 'amedida' ? 'A cotizar' : money(selection.planPrice) + ' ARS',
    'Plantilla elegida': `${selection.template} (${selection.templateId})`,
    'Inversión estimada inicial': estimatedInitial,

    '━━━━━━━━ CONFIGURACIÓN VISUAL ━━━━━━━━': '',
    'Nombre mostrado en la web': selection.businessName,
    'Título principal': selection.heroTitle,
    'Descripción': selection.heroDescription,
    'Color principal': selection.accent,
    'Fondo': selection.theme,
    'Tipografía': selection.font,
    'Formato de productos': selection.productLayout === 'sidebar' ? 'Barra lateral' : 'Cuadrícula',
    'Adicional barra lateral': selection.sidebarProducts ? `+ ${money(EXTRA_PRICES.sidebarProducts)}` : 'No',

    '━━━━━━━━ FUNCIONES SELECCIONADAS ━━━━━━━━': featureExtras.length || featureIncluded.length ? formatFeatureList(selection) : 'Ninguna',
    'Extras con precio individual': featureExtras.length ? featureExtras.map(item=>`${item.label}: + ${money(item.price)}`).join('\n') : 'Ninguno',
    'Funciones incluidas por el plan': featureIncluded.length ? featureIncluded.map(item=>item.label).join('\n') : 'Ninguna',
    'Total extras del editor': money(extrasTotal) + ' ARS',

    '━━━━━━━━ MANTENIMIENTO ━━━━━━━━': '',
    'Mantenimiento elegido': maintenanceLabel(maintenanceKey),
    'Cuota mensual mantenimiento': maintenanceCost === null ? 'A cotizar' : money(maintenanceCost) + ' /mes',
    'Aclaración': maintenanceKey === 'sin_mantenimiento'
      ? 'Sin mantenimiento no se pueden actualizar productos, precios ni contenidos de forma periódica.'
      : 'Con mantenimiento, Vexa puede realizar actualizaciones según la frecuencia seleccionada.',

    '━━━━━━━━ DETALLE TÉCNICO PARA VEXA ━━━━━━━━': '',
    'Estado de cada función': selection.featureDetails.map(item=>`${item.label}: ${item.status}${item.selected && !item.included ? ` (+${money(item.price)})` : item.selected && item.included ? ' (incluido)' : ''}`).join('\n')
  };

  Object.keys(datos).forEach(key=>{ if(datos[key] === undefined) delete datos[key]; });
  return datos;
}

async function submitEditorQuote(event){
  event.preventDefault();
  const selection = buildDesignSelection();
  localStorage.setItem('vexa:designSelection', JSON.stringify(selection));
  if(!quoteForm.reportValidity()) return;
  quoteSubmit.disabled = true;
  quoteSubmit.textContent = 'Enviando selección...';
  quoteStatus.textContent = 'Enviando tu diseño y configuración a Vexa…';
  quoteStatus.className = 'quote-send-status sending';
  try{
    const response = await fetch(FORM_SUBMIT_URL, {
      method:'POST',
      headers:{'Accept':'application/json','Content-Type':'application/json'},
      body:JSON.stringify(buildQuoteEmailData(selection))
    });
    const result = await response.json().catch(()=>({}));
    if(!response.ok || result.success === false) throw new Error(result.message || 'No se pudo enviar la solicitud.');
    quoteStatus.textContent = 'Solicitud enviada correctamente. Vexa recibió tu diseño completo y tus datos de contacto.';
    quoteStatus.className = 'quote-send-status success';
    quoteSubmit.textContent = 'Solicitud enviada ✓';
    persist(false);
  }catch(error){
    console.error('Error al enviar selección del editor:', error);
    quoteStatus.textContent = 'No se pudo enviar. Revisá tu conexión e intentá nuevamente.';
    quoteStatus.className = 'quote-send-status error';
    quoteSubmit.disabled = false;
    quoteSubmit.textContent = 'Enviar a Vexa';
  }
}
quoteForm?.addEventListener('submit', submitEditorQuote);

function resetDesign(){
  state = cloneDefaults();
  currentTemplateIndex = 0;
  renderControls(); renderPreviewAndSummary(); persist(false); toast('Diseño restablecido.');
}

if (planSelectEditor) planSelectEditor.addEventListener('change',()=>{
  const nextPlan = planSelectEditor.value;
  if(!PLAN_RULES[nextPlan] || nextPlan===currentPlan) return;
  currentPlan = nextPlan;
  resetStateForPlan();
  renderControls(); renderPreviewAndSummary(); persist(false);
});

['businessName','heroTitle','heroDescription'].forEach(id=>el(id).addEventListener('input',e=>{
  state[id] = e.target.value;
  renderPreviewAndSummary(); persist(false);
}));
el('accentColor').addEventListener('input',e=>{
  state.accent = e.target.value; el('accentHex').textContent = e.target.value.toUpperCase(); renderPreviewAndSummary(); persist(false);
});
el('fontFamily').addEventListener('change',e=>{ state.font=e.target.value; renderPreviewAndSummary(); persist(false); });
document.querySelectorAll('[data-theme]').forEach(btn=>btn.addEventListener('click',()=>{state.theme=btn.dataset.theme;renderControls();renderPreviewAndSummary();persist(false)}));
document.querySelectorAll('[data-product-layout]').forEach(btn=>btn.addEventListener('click',()=>{
  if(btn.disabled) return;
  state.productLayout = btn.dataset.productLayout; renderControls(); renderPreviewAndSummary(); persist(false);
}));
document.querySelectorAll('[data-device]').forEach(btn=>btn.addEventListener('click',()=>{
  state.device=btn.dataset.device;
  document.querySelectorAll('[data-device]').forEach(b=>b.classList.toggle('active',b===btn));
  previewFrame.classList.toggle('mobile',state.device==='mobile');
}));
el('saveDesign').addEventListener('click',()=>persist(true));
el('sendToQuote').addEventListener('click',sendToQuote);
el('resetDesign').addEventListener('click',resetDesign);

window.addEventListener('storage',event=>{
  if(event.key==='vexa:designSelection') toast('La selección fue actualizada en otra pestaña.');
});

restore();
renderControls();
renderPreviewAndSummary();
previewFrame.classList.toggle('mobile', state.device==='mobile');
