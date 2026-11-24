async function cargarDetalle() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const contenedor = document.getElementById('detalle-producto');

  const res = await fetch('data/productos.json');
  const productos = await res.json();
  const prod = productos.find(p => p.id === id);

  if (!prod) {
    contenedor.innerHTML = '<h2>Producto no encontrado.</h2>';
    return;
  }

  const carrito = typeof obtenerCarrito === 'function' ? obtenerCarrito() : [];
  const enCarrito = carrito.find(item => item.id === prod.id);
  const stockReal = prod.stock - (enCarrito ? enCarrito.cantidad : 0);

  contenedor.innerHTML = `
    <div style="display:flex; gap:2rem; flex-wrap:wrap; align-items:center;">
      <img src="${prod.imagen}" alt="${prod.nombre}" style="max-width:400px; width:100%; border-radius:8px;">
      <div style="flex:1;">
        <span class="categoria-tag">${prod.categoria}</span>
        <h1 style="margin:0.5rem 0;">${prod.nombre}</h1>
        <p style="font-size:1.1rem; margin-bottom:1rem;">${prod.descripcion}</p>
        <p class="precio" style="font-size:2rem;">${prod.precio} Bs</p>
        <p class="${stockReal > 0 ? 'stock-ok' : 'stock-no'}" style="margin-bottom:1.5rem;">
          ${stockReal > 0 ? `En stock: ${stockReal} unidades` : 'Producto Agotado'}
        </p>
        <button onclick="agregarAlCarrito(${prod.id})" class="btn btn-acento" ${stockReal <= 0 ? 'disabled' : ''}>
          🛒 Agregar al Carrito
        </button>
      </div>
    </div>
  `;
}

cargarDetalle();
