VEXA ESTUDIO PAGE - ENVIO DE SOLICITUDES POR EMAIL

CAMBIOS DE ESTA VERSION
- El formulario muestra claramente el plan seleccionado.
- Los botones “Elegir este plan” dejan el plan marcado automáticamente.
- El correo recibido incluye un desglose visual por plan, adicionales, inversión inicial y mantenimiento.
- El mantenimiento es opcional.
- Sin mantenimiento, Vexa no actualizará productos, precios ni contenidos periódicamente.
- Se agregó validación local gratuita del formato del teléfono y un botón para abrir WhatsApp y comprobarlo directamente.
- Se agregó el apartado “Trabajos reales” con aviso antes de abrir cada web.

PARA CONFIGURAR TU CORREO
1. Abrí script.js.
2. Busca esta línea:
   const EMAIL_EMPRESA = 'TU_CORREO_EMPRESA@gmail.com';
3. Reemplazala por el correo que quieras recibir las solicitudes.
4. Guarda el archivo y vuelve a publicar la web.

PORTAFOLIO / TRABAJOS DE CLIENTES
En script.js busca:
   const TRABAJOS_CLIENTES = [ ... ]

Ahí tenés los lugares exactos para agregar las URLs reales.
Ejemplo:
   { name: 'Tienda Ana', category: 'Tienda Online', description: 'Web publicada para una tienda.', url: 'https://tudominio.com' }

No hace falta editar el HTML de la sección “Trabajos reales”: las tarjetas se generan automáticamente desde ese arreglo.

ENVIO
El formulario usa AJAX de FormSubmit. No se agregó backend propio.
El correo usa la plantilla visual “box” de FormSubmit.

TELÉFONO / WHATSAPP
El formulario solo recopila el número que ingresa el cliente. Se eliminó la comprobación de existencia del número y no se requiere ningún servicio de verificación.


CAMBIOS VISUALES V4
- Se eliminó la comprobación de teléfono y sus endpoints/archivos de servidor.
- Se eliminó el apartado general “Opcionales”; esas opciones continúan dentro del formulario.
- La galería de diseños quedó en una sola franja horizontal y la previsualización aparece debajo.
- Los productos de catálogo/tienda dentro de la preview se muestran en línea horizontal.
- Los trabajos reales también se muestran en una sola franja horizontal para reducir scroll.
- El título del bloque de inversión ahora es exactamente “RESUMEN”.

============================================================
EDITOR VISUAL — DÓNDE EDITARLO
============================================================

El editor visual está separado de la página principal para evitar hacerla larga:
- Archivo: editor.html
- Estilos: editor.css
- Lógica y precios: editor.js

IMPORTANTE:
1) Para cambiar el valor de un extra, editá EXTRA_PRICES dentro de editor.js.
2) Para limitar o habilitar funciones por plan, editá PLAN_RULES dentro de editor.js.
3) Para cambiar el nombre, orden o distribución base de las 4 plantillas, editá PLAN_TEMPLATES.
4) El editor no publica nada ni necesita servidor: solo guarda temporalmente la selección en el navegador.
5) El botón “Usar en mi cotización” guarda la selección en localStorage y vuelve al cotizador.

COMPATIBILIDAD MÓVIL:
En escritorio la barra de herramientas queda a la izquierda. En móviles pasa a una barra horizontal desplazable para no comprimir la previsualización.


============================================================
EDITOR VISUAL — ENVÍO DIRECTO DE LA COTIZACIÓN
============================================================

CAMBIO IMPORTANTE:
- “Usar en mi cotización” YA NO devuelve al formulario principal.
- Se abre un segundo formulario dentro del editor.
- El cliente completa solo: nombre de contacto, empresa, WhatsApp/teléfono, email opcional, mantenimiento y un comentario opcional.
- La selección visual completa se envía DIRECTAMENTE a EMAIL_EMPRESA mediante FormSubmit.

EL CORREO RECIBE DE FORMA DETALLADA:
- Datos del cliente.
- Plan y precio base.
- Plantilla elegida.
- Nombre, título y descripción configurados.
- Color, fondo y tipografía.
- Formato de productos.
- Cada función seleccionada por separado.
- Precio individual de cada función extra.
- Qué funciones quedaron incluidas por el plan.
- Total de extras del editor.
- Inversión inicial estimada.
- Mantenimiento y su cuota mensual.
- Estado completo de cada función del editor.

PRECIOS INDIVIDUALES — EDITAR EN editor.js
Buscá EXTRA_PRICES.
- whatsapp: 8000
- instagram: 5000
- facebook: 5000
- tiktok: 5000
- cart: 25000
- search: 7000
- dynamicImages: 9000
- sidebarProducts: 4000
- leadForm: 20000

TIPOGRAFÍA Y GAMA DE COLORES NO TIENEN PRECIO ADICIONAL.

REGLAS POR PLAN
Buscá PLAN_RULES en editor.js para definir qué función está permitida,
qué función está incluida y qué queda bloqueado por cada plan.

CORREO DESTINO
Buscá EMAIL_EMPRESA en editor.js.
Actualmente está configurado como:
   xenastudiopage@gmail.com

El editor sigue funcionando sin backend propio; el envío depende de FormSubmit.
