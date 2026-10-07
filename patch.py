from pathlib import Path
import re

root = Path('/mnt/data/vexa_fix5')
js = root/'editor.js'
css = root/'editor.css'
text = js.read_text()

# 1) Add cart price + clear editable comments.
old = """/* EDITÁ ESTOS VALORES CUANDO QUIERAS CAMBIAR LA INVERSIÓN DE CADA EXTRA. */
const EXTRA_PRICES = {
  instagram: 5000,
  facebook: 5000,
  tiktok: 5000,
  whatsapp: 8000,
  search: 7000,
  dynamicImages: 9000,
  sidebarProducts: 4000,
  leadForm: 20000
};"""
new = """/* =========================================================
   PRECIOS DE FUNCIONES — EDITÁ SOLO ESTOS NÚMEROS
   ---------------------------------------------------------
   Acá podés cambiar a tu gusto el precio INDIVIDUAL de cada
   función. No hace falta tocar el resto del editor.

   IMPORTANTE:
   - carrito            -> precio extra del carrito de compra
   - whatsapp           -> botón de WhatsApp
   - instagram          -> botón/enlace de Instagram
   - facebook           -> botón/enlace de Facebook
   - tiktok             -> botón/enlace de TikTok
   - search             -> buscador
   - dynamicImages      -> imágenes dinámicas al pasar el cursor
   - sidebarProducts    -> productos en barra lateral
   - leadForm           -> formulario de consultas

   TIP: cambiá, por ejemplo, 25000 por 30000 y el nuevo valor
   se actualizará automáticamente en el editor y en el correo.
   ========================================================= */
const EXTRA_PRICES = {
  cart: 25000,           // <-- CAMBIÁ ACÁ el precio del CARRITO
  whatsapp: 8000,        // <-- CAMBIÁ ACÁ el precio de WHATSAPP
  instagram: 5000,      // <-- CAMBIÁ ACÁ el precio de INSTAGRAM
  facebook: 5000,        // <-- CAMBIÁ ACÁ el precio de FACEBOOK
  tiktok: 5000,          // <-- CAMBIÁ ACÁ el precio de TIKTOK
  search: 7000,          // <-- CAMBIÁ ACÁ el precio del BUSCADOR
  dynamicImages: 9000,   // <-- CAMBIÁ ACÁ el precio de IMÁGENES DINÁMICAS
  sidebarProducts: 4000, // <-- CAMBIÁ ACÁ el precio de BARRA LATERAL
  leadForm: 20000        // <-- CAMBIÁ ACÁ el precio del FORMULARIO
};"""
if old not in text:
    raise SystemExit('EXTRA_PRICES block not found')
text = text.replace(old, new)

# 2) Replace productArea function with richer realistic storefront preview.
start = text.index('function productArea(){')
end = text.index('\nfunction servicesSection(){', start)
product_fn = r'''function productArea(){
  const commerce = ['catalogo','catalogoplus','tienda','tiendapro','amedida'].includes(currentPlan);
  const showProducts = planRule().products && commerce;
  if(!showProducts) return '';
  const canCart = state.features.cart;
  const canSearch = state.features.search;
  const dynamic = state.features.dynamicImages;
  const layout = state.productLayout;

  // =========================================================
  // PRODUCTOS DE DEMO
  // ---------------------------------------------------------
  // Estas imágenes son ilustrativas y sirven para que el cliente
  // vea cómo podría verse una tienda REAL. No son emojis.
  // Para cambiar los productos de la demo, reemplazá estos SVG
  // dentro de /img/preview/.
  // =========================================================
  const products = [
    {name:'Camisa Essential', category:'Indumentaria', price:'24.900', main:'product-shirt.svg', alt:'product-shirt-alt.svg', tag:'NUEVO'},
    {name:'Bolso Studio', category:'Accesorios', price:'32.500', main:'product-bag.svg', alt:'product-bag-alt.svg', tag:'DESTACADO'},
    {name:'Runner Street', category:'Calzado', price:'41.900', main:'product-shoe.svg', alt:'product-shoe-alt.svg', tag:'TOP VENTAS'},
    {name:'Smart Watch', category:'Tecnología', price:'58.900', main:'product-watch.svg', alt:'product-watch-alt.svg', tag:'NUEVO'},
    {name:'Camisa Premium', category:'Indumentaria', price:'29.900', main:'product-shirt-alt.svg', alt:'product-shirt.svg', tag:'EDICIÓN'},
    {name:'Bolso Urban', category:'Accesorios', price:'36.900', main:'product-bag-alt.svg', alt:'product-bag.svg', tag:'LIMITADO'}
  ];

  const productMarkup = products.slice(0, layout==='sidebar'?4:6).map((product,i)=>`
    <article class="product-card ${dynamic?'dynamic':''}" ${dynamic?'tabindex="0" aria-label="${escapeHtml(product.name)} con imágenes dinámicas"':''}>
      <div class="product-image">
        <div class="product-tag">${escapeHtml(product.tag)}</div>
        <img class="product-img main" src="img/preview/${product.main}" alt="Imagen de ${escapeHtml(product.name)}" loading="lazy">
        <img class="product-img alt" src="img/preview/${product.alt}" alt="Vista alternativa de ${escapeHtml(product.name)}" loading="lazy">
        ${dynamic?'<span class="dynamic-hint">Pasá el cursor</span>':''}
      </div>
      <div class="product-meta">
        <span class="product-category">${escapeHtml(product.category)}</span>
        <h4>${escapeHtml(product.name)}</h4>
        <div class="product-rating" aria-label="5 de 5 estrellas">★★★★★ <span>4.9</span></div>
      </div>
      <div class="product-bottom">
        <div><span class="product-price">$ ${product.price}</span><small>Envío calculado al finalizar</small></div>
        ${canCart?`<button type="button" class="buy-mini filled" data-demo-add="${i}">Agregar</button>`:`<button type="button" class="buy-mini" data-demo-consult="${i}">Consultar</button>`}
      </div>
    </article>`).join('');

  return `<section class="content-band product-section">
    <div class="products-layout ${layout}">
      ${layout==='sidebar'?`<aside class="products-filter"><strong>Categorías</strong><span class="active">Todos</span><span>Indumentaria</span><span>Accesorios</span><span>Calzado</span><span>Tecnología</span><span>Ofertas</span></aside>`:''}
      <div class="products-list">
        <div class="products-toolbar">
          <div>
            <span class="site-kicker">${currentPlan==='tiendapro'?'TIENDA ONLINE':'CATÁLOGO'}</span>
            <h3 style="margin:3px 0 0">${currentPlan==='catalogo'?'Catálogo':currentPlan==='tiendapro'?'Tienda online':'Productos'}</h3>
            <p class="products-toolbar-sub">${canCart?'Elegí un producto y agregalo al carrito.':'Explorá productos y consultá por el que te interese.'}</p>
          </div>
          <div class="product-tools">
            ${canSearch?'<div class="demo-search"><img src="img/preview/search-mini.svg" alt=""><span>Buscar productos</span></div>':''}
            ${canCart?`<button type="button" class="demo-cart-button" aria-label="Carrito"><img src="img/preview/feature-cart.svg" alt=""><span>Carrito <b id="site-cart-count">${demoCartCount}</b></span></button>`:''}
          </div>
        </div>
        <div class="site-grid cols-3">${productMarkup}</div>
      </div>
    </div>
    ${dynamic?'<div class="site-feature-ribbon"><img src="img/preview/feature-dynamic.svg" alt="Ejemplo de imágenes dinámicas"><div><strong>Imágenes dinámicas activas</strong><span>La segunda imagen del mismo producto aparece al interactuar con la tarjeta.</span></div></div>':''}
    ${canCart?'<div class="site-feature-ribbon mini-cart-preview"><img src="img/preview/feature-cart.svg" alt="Ejemplo de carrito"><div><strong>Experiencia de compra</strong><span>El cliente puede agregar productos y ver el carrito en la misma web.</span></div><b class="mini-cart-total">Carrito: <span id="site-cart-total">$ 0</span></b></div>':''}
  </section>`;
}'''
text = text[:start] + product_fn + text[end:]

# 3) Add demo cart state before productArea function.
needle = "function updateProductLayoutUI(){"
insert = "let demoCartCount = 0;\nlet demoCartTotal = 0;\n\n"
text = text.replace(needle, insert + needle, 1)

# 4) Update renderPreview nav cart/search icons and attach demo actions.
old_nav = """        <div class=\"site-nav-tools\">\n          ${state.features.search?'<span class=\"site-icon\">⌕</span>':''}\n          ${state.features.cart?'<span class=\"site-icon\">🛒</span>':''}\n        </div>"""
new_nav = """        <div class=\"site-nav-tools\">\n          ${state.features.search?'<span class=\"site-icon\" aria-label=\"Buscador\"><img src=\"img/preview/search-mini.svg\" alt=\"\"></span>':''}\n          ${state.features.cart?'<span class=\"site-icon cart-nav-icon\" aria-label=\"Carrito\"><img src=\"img/preview/feature-cart.svg\" alt=\"\"><b id=\"site-cart-count-nav\">'+demoCartCount+'</b></span>':''}\n        </div>"""
if old_nav not in text:
    raise SystemExit('nav block not found')
text = text.replace(old_nav, new_nav)

# Add binding after previewSite.innerHTML closing render. We insert before function calculatePrice.
marker = "\nfunction calculatePrice(){"
bind = r'''

  // =========================================================
  // MICRO-INTERACCIONES DE LA DEMO
  // ---------------------------------------------------------
  // No son compras reales: sirven para que el cliente vea cómo
  // se sentiría una tienda funcional antes de contratarla.
  // =========================================================
  previewSite.querySelectorAll('[data-demo-add]').forEach(btn=>btn.addEventListener('click',()=>{
    const idx = Number(btn.dataset.demoAdd);
    const demoPrices = ['24900','32500','41900','58900','29900','36900'];
    demoCartCount += 1;
    demoCartTotal += Number(demoPrices[idx] || 0);
    const countA = previewSite.querySelector('#site-cart-count');
    const countB = previewSite.querySelector('#site-cart-count-nav');
    const total = previewSite.querySelector('#site-cart-total');
    if(countA) countA.textContent = demoCartCount;
    if(countB) countB.textContent = demoCartCount;
    if(total) total.textContent = money(demoCartTotal);
    btn.textContent = 'Agregado ✓';
    btn.classList.add('added');
    setTimeout(()=>{btn.textContent='Agregar';btn.classList.remove('added')},1200);
  }));

  previewSite.querySelectorAll('[data-demo-consult]').forEach(btn=>btn.addEventListener('click',()=>{
    btn.textContent = 'Consulta enviada ✓';
    setTimeout(()=>btn.textContent='Consultar',1200);
  }));
'''
text = text.replace(marker, bind + marker, 1)

# 5) Reset demo cart when preview re-renders only when plan changes/template? Keep within same render so no reset every small state change.
# Instead reset only when switching plan via resetStateForPlan.
text = text.replace("function resetStateForPlan(){\n  state = cloneDefaults();", "function resetStateForPlan(){\n  demoCartCount = 0;\n  demoCartTotal = 0;\n  state = cloneDefaults();", 1)
text = text.replace("function resetDesign(){\n  state = cloneDefaults();", "function resetDesign(){\n  demoCartCount = 0;\n  demoCartTotal = 0;\n  state = cloneDefaults();", 1)

# 6) Add explicit helper to quote detail for cart price if selected. Existing featureDetails now picks it up automatically.
# No further changes needed.

js.write_text(text)

# 7) CSS additions for more visual/fancy product cards.
css_text = css.read_text()
css_add = r'''

/* =========================================================
   V9 — PREVISUALIZACIÓN DE PRODUCTOS MÁS REALISTA
   ---------------------------------------------------------
   Estos estilos hacen que el editor parezca una web funcional:
   fotos de producto, precio, rating, búsqueda, carrito y CTA.
   ========================================================= */
.products-toolbar{display:flex;justify-content:space-between;gap:12px;align-items:end;margin-bottom:12px}.products-toolbar-sub{margin:3px 0 0;color:var(--site-muted);font-size:7px;line-height:1.45}.product-tools{display:flex;gap:6px;align-items:center}.demo-search{display:flex;align-items:center;gap:5px;height:27px;padding:0 8px;border-radius:7px;border:1px solid var(--site-border);background:var(--site-bg);color:var(--site-muted);font-size:7px}.demo-search img{width:12px;height:12px;object-fit:cover;border-radius:3px}.demo-cart-button{display:flex;align-items:center;gap:5px;min-height:27px;padding:0 8px;border-radius:7px;border:1px solid color-mix(in srgb,var(--site-accent) 45%,var(--site-border));background:var(--site-surface);color:var(--site-text);font-size:7px;font-weight:800}.demo-cart-button img{width:15px;height:15px;object-fit:cover;border-radius:3px}.demo-cart-button b{display:inline-grid;place-items:center;min-width:14px;height:14px;padding:0 3px;border-radius:999px;background:var(--site-accent);color:#fff;font-size:6px}.site-icon{display:inline-flex;align-items:center;gap:3px}.site-icon img{width:16px;height:16px;object-fit:cover;border-radius:4px}.site-icon b{display:inline-grid;place-items:center;min-width:13px;height:13px;padding:0 3px;border-radius:999px;background:var(--site-accent);color:#fff;font-size:5px}.product-meta{min-width:0}.product-category{text-transform:uppercase;letter-spacing:.1em;color:var(--site-muted);font-size:5px;font-weight:800}.product-rating{margin-top:3px;color:var(--site-accent);font-size:7px;letter-spacing:.06em}.product-rating span{color:var(--site-muted);letter-spacing:0;font-size:6px}.product-bottom>div{min-width:0}.product-bottom small{display:block;margin-top:2px;color:var(--site-muted);font-size:5px;line-height:1.3}.dynamic-hint{position:absolute;right:7px;bottom:7px;padding:3px 5px;border-radius:999px;background:rgba(3,10,17,.75);color:#fff;font-size:5px;z-index:3}.buy-mini.added{background:#2bb673;color:#fff;border-color:#2bb673}.mini-cart-preview{display:flex;align-items:center;gap:8px}.mini-cart-preview img{width:34px;height:24px;object-fit:cover;border-radius:5px;flex:0 0 auto}.mini-cart-preview div{min-width:0}.mini-cart-preview .mini-cart-total{margin-left:auto;color:var(--site-text);font-size:7px;white-space:nowrap}
@media (max-width:720px){.products-toolbar{align-items:stretch;flex-direction:column}.product-tools{justify-content:space-between}.demo-search{flex:1}.product-tools>*{flex:1}.mini-cart-preview{align-items:flex-start}.mini-cart-preview .mini-cart-total{margin-left:0}.product-card h4{font-size:10px}.product-card p{font-size:7px}}
'''
if 'V9 — PREVISUALIZACIÓN DE PRODUCTOS MÁS REALISTA' not in css_text:
    css_text += css_add
css.write_text(css_text)

# 8) Create paired alternate product images.
svgs = {
'product-shirt-alt.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fbe4ee"/><stop offset="1" stop-color="#e8c0d4"/></linearGradient></defs><rect width="600" height="600" rx="36" fill="url(#bg)"/><path d="M172 165l92-56 37 52 37-52 90 56-25 72-57-28v188H252V209l-57 28z" fill="#8c294f"/><path d="M274 162h52l-26 34z" fill="#fff" opacity=".88"/><circle cx="470" cy="114" r="46" fill="#fff" opacity=".38"/></svg>''',
'product-bag-alt.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e4f4e9"/><stop offset="1" stop-color="#b8d8c1"/></linearGradient></defs><rect width="600" height="600" rx="36" fill="url(#bg)"/><path d="M148 216c0-22 18-40 40-40h224c22 0 40 18 40 40v238c0 19-15 34-34 34H182c-19 0-34-15-34-34z" fill="#174d34"/><path d="M225 226c0-78 150-78 150 0" fill="none" stroke="#0d3523" stroke-width="24" stroke-linecap="round"/><rect x="198" y="296" width="204" height="54" rx="27" fill="#dff4e5" opacity=".9"/><text x="300" y="331" text-anchor="middle" font-family="Arial" font-size="24" font-weight="700" fill="#174d34">STUDIO</text><circle cx="478" cy="110" r="46" fill="#fff" opacity=".3"/></svg>''',
'product-shoe-alt.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff0d9"/><stop offset="1" stop-color="#e9c996"/></linearGradient></defs><rect width="600" height="600" rx="36" fill="url(#bg)"/><path d="M110 362c88 10 125-29 162-111l68 44c31 20 59 35 96 48 45 15 66 34 74 68H134c-25 0-42-18-42-37 0-9 7-18 18-22z" fill="#7b4321"/><path d="M133 406h354" stroke="#fff" stroke-width="16" stroke-linecap="round"/><path d="M236 309l56-17M253 333l58-18" stroke="#f5d6b1" stroke-width="10" stroke-linecap="round"/></svg>''',
'product-watch-alt.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#eee8ff"/><stop offset="1" stop-color="#cfc1ef"/></linearGradient></defs><rect width="600" height="600" rx="36" fill="url(#bg)"/><rect x="260" y="62" width="80" height="472" rx="32" fill="#7b4cc6"/><rect x="201" y="160" width="198" height="230" rx="54" fill="#2a193f"/><rect x="228" y="186" width="144" height="177" rx="40" fill="#0d1022"/><circle cx="300" cy="272" r="48" fill="#8c6de2" opacity=".92"/><path d="M300 240v36l26 16" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/><circle cx="476" cy="112" r="46" fill="#fff" opacity=".3"/></svg>''',
'search-mini.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#091827"/><circle cx="28" cy="28" r="13" fill="none" stroke="#00d2ff" stroke-width="6"/><path d="M38 38l13 13" stroke="#00d2ff" stroke-width="6" stroke-linecap="round"/></svg>'''
}
imgdir = root/'img/preview'
for name, data in svgs.items():
    (imgdir/name).write_text(data)

# 9) README price map mention cart explicitly.
readme = root/'README-ENVIO-CORREO.txt'
rt = readme.read_text()
rt = re.sub(r'(?m)^- cart:.*$', '- cart: 25000  # <-- precio del carrito (editá EXTRA_PRICES en editor.js)', rt)
if 'carrito' not in rt.lower() or '25000' not in rt:
    rt += '\n\nPRECIO DEL CARRITO: editá EXTRA_PRICES.cart dentro de editor.js.\n'
readme.write_text(rt)

print('patched')
