VEXA ESTUDIO PAGE - ENVIO DE SOLICITUDES POR EMAIL

CAMBIO PRINCIPAL
El formulario del cotizador ahora envia la solicitud por email mediante FormSubmit. No se agrego ningun servidor/backend propio.

PARA CONFIGURAR TU CORREO
1. Abri script.js.
2. Busca esta linea:
   const EMAIL_EMPRESA = 'TU_CORREO_EMPRESA@gmail.com';
3. Reemplazala por el Gmail que quieras recibir las solicitudes. Ejemplo:
   const EMAIL_EMPRESA = 'tuempresa@gmail.com';
4. Guarda el archivo y vuelve a publicar la web.

IMPORTANTE
La primera vez que FormSubmit reciba una solicitud para ese correo, puede pedir una confirmacion/activacion desde el email. Esto es normal y se hace una sola vez por direccion.

QUE SE ENVIA
- Nombre del emprendimiento
- Publico objetivo
- Tipo de web
- Frecuencia de mantenimiento
- Redes sociales seleccionadas
- Boton de WhatsApp
- Formulario de consultas
- Inversion inicial calculada
- Cuota de mantenimiento

No se modificaron los precios ni la logica del cotizador.
