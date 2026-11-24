function leerCarritoLocal() {
  return JSON.parse(localStorage.getItem('carritoBellaFlor')) || [];
}

function renderizarCarrito() {
  const carrito = leerCarritoLocal();
  const tbody = document.getElementById('lista-carrito');
  const totalSpan = document.getElementById('total-carrito');

  if (!tbody || !totalSpan) return;

  if (carrito.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Tu carrito está vacío.</td></tr>';
    totalSpan.textContent = '0 Bs';
    return;
  }

  let totalGeneral = 0;

  tbody.innerHTML = carrito.map((item, index) => {
    const subtotal = item.precio * item.cantidad;
    totalGeneral += subtotal;
    return `
      <tr>
        <td>${item.nombre}</td>
        <td>${item.precio} Bs</td>
        <td>${item.cantidad}</td>
        <td><strong>${subtotal} Bs</strong></td>
        <td><button type="button" onclick="eliminarItem(${index})" class="btn btn-rojo" style="padding:4px 8px;">Quitar</button></td>
      </tr>
    `;
  }).join('');

  totalSpan.textContent = `${totalGeneral.toLocaleString()} Bs`;
}

function eliminarItem(index) {
  let carrito = leerCarritoLocal();
  carrito.splice(index, 1);
  localStorage.setItem('carritoBellaFlor', JSON.stringify(carrito));
  if (typeof actualizarContadorCarrito === 'function') actualizarContadorCarrito();
  renderizarCarrito();
}

function vaciarTodoElCarrito() {
  localStorage.removeItem('carritoBellaFlor');
  if (typeof actualizarContadorCarrito === 'function') actualizarContadorCarrito();
  renderizarCarrito();
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarCarrito();

  const btnVaciar = document.getElementById('btn-vaciar');
  if (btnVaciar) {
    btnVaciar.addEventListener('click', vaciarTodoElCarrito);
  }

  const btnComprar = document.getElementById('btn-comprar');
  if (btnComprar) {
    btnComprar.addEventListener('click', () => {
      const carrito = leerCarritoLocal();
      if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
      }
      alert('🌸 ¡Pedido simulado realizado con éxito! Gracias por elegir Florería Bella FlorSaly.');
      vaciarTodoElCarrito();
    });
  }
});
