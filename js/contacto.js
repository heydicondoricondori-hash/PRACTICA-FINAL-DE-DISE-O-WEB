document.getElementById('form-contacto').addEventListener('submit', function(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const celular = document.getElementById('celular').value.trim();
  const asunto = document.getElementById('asunto').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  const alerta = document.getElementById('alerta-contacto');

  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nombre || !correo || !celular || !asunto || !mensaje) {
    alerta.className = 'alerta alerta-error';
    alerta.textContent = '❌ Por favor, completa todos los campos obligatorios.';
    return;
  }

  if (!regexCorreo.test(correo)) {
    alerta.className = 'alerta alerta-error';
    alerta.textContent = '❌ Ingresa un correo electrónico válido.';
    return;
  }

  if (celular.length < 7 || isNaN(celular)) {
    alerta.className = 'alerta alerta-error';
    alerta.textContent = '❌ Ingresa un número de celular válido (mínimo 7 dígitos).';
    return;
  }

  alerta.className = 'alerta alerta-exito';
  alerta.textContent = `✅ ¡Gracias ${nombre}! Tu consulta sobre "${asunto}" ha sido enviada con éxito.`;
  this.reset();
});
