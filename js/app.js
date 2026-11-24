function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carritoBellaFlor')) || [];
}

// Calcula cuánto stock queda restando lo que ya está en el carrito
function obtenerStockDisponible(producto) {
  const carrito = obtenerCarrito();
  const enCarrito = carrito.find(item => item.id === producto.id);
  const cantidadEnCarrito = enCarrito ? enCarrito.cantidad : 0;
  return producto.stock - cantidadEnCarrito;
}

function actualizarContadorCarrito() {
  const carrito = obtenerCarrito();
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const badge = document.getElementById('contador-carrito');
  if (badge) badge.textContent = totalItems;
}

async function agregarAlCarrito(idProducto) {
  const res = await fetch('data/productos.json');
  const productos = await res.json();
  const prod = productos.find(p => p.id === idProducto);

  if (!prod) return;

  const stockRestante = obtenerStockDisponible(prod);

  if (stockRestante <= 0) {
    alert('❌ Ya no queda más stock disponible de este arreglo.');
    return;
  }

  let carrito = obtenerCarrito();
  const existe = carrito.find(item => item.id === idProducto);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ id: prod.id, nombre: prod.nombre, precio: prod.precio, cantidad: 1 });
  }

  localStorage.setItem('carritoBellaFlor', JSON.stringify(carrito));
  actualizarContadorCarrito();

  // Actualiza el stock en pantalla en cualquiera de las páginas donde estés
  if (typeof cargarDestacados === 'function') cargarDestacados();
  if (typeof aplicarFiltros === 'function') aplicarFiltros();
  if (typeof cargarDetalle === 'function') cargarDetalle();

  alert(`🌸 "${prod.nombre}" se agregó al carrito.`);
}

async function cargarDestacados() {
  const contenedor = document.getElementById('contenedor-destacados');
  if (!contenedor) return;

  const res = await fetch('data/productos.json');
  const productos = await res.json();
  const destacados = productos.filter(p => p.destacado);

  contenedor.innerHTML = destacados.map(p => {
    const stockReal = obtenerStockDisponible(p);
    return `
      <div class="card">
        <img src="${p.imagen}" alt="${p.nombre}">
        <div class="card-body">
          <div>
            <span class="categoria-tag">${p.categoria}</span>
            <h3>${p.nombre}</h3>
            <p class="precio">${p.precio} Bs</p>
            <p class="${stockReal > 0 ? 'stock-ok' : 'stock-no'}">
              ${stockReal > 0 ? `Disponible (${stockReal} unid.)` : 'Agotado'}
            </p>
          </div>
          <div class="card-acciones">
            <a href="detalle.html?id=${p.id}" class="btn">Ver Detalle</a>
            <button onclick="agregarAlCarrito(${p.id})" class="btn btn-acento" ${stockReal === 0 ? 'disabled' : ''}>+ Carrito</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  actualizarContadorCarrito();
  cargarDestacados();
});
