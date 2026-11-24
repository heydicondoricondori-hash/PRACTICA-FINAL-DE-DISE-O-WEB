let todosLosProductos = [];

async function iniciarCatalogo() {
  const res = await fetch('data/productos.json');
  todosLosProductos = await res.json();

  cargarCategorias();
  renderizarProductos(todosLosProductos);
}

function cargarCategorias() {
  const select = document.getElementById('filtro-categoria');
  select.innerHTML = '<option value="todas">Todas las categorías</option>';
  const categorias = [...new Set(todosLosProductos.map(p => p.categoria))];
  categorias.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

function renderizarProductos(lista) {
  const contenedor = document.getElementById('contenedor-productos');
  if (lista.length === 0) {
    contenedor.innerHTML = '<p>No se encontraron arreglos con esos filtros.</p>';
    return;
  }

  const carrito = typeof obtenerCarrito === 'function' ? obtenerCarrito() : [];

  contenedor.innerHTML = lista.map(p => {
    const enCarrito = carrito.find(item => item.id === p.id);
    const stockReal = p.stock - (enCarrito ? enCarrito.cantidad : 0);

    return `
      <div class="card">
        <img src="${p.imagen}" alt="${p.nombre}">
        <div class="card-body">
          <div>
            <span class="categoria-tag">${p.categoria}</span>
            <h3>${p.nombre}</h3>
            <p style="font-size:0.9rem; color:#475569; margin-top:4px;">${p.descripcion}</p>
            <p class="precio">${p.precio} Bs</p>
            <p class="${stockReal > 0 ? 'stock-ok' : 'stock-no'}">
              ${stockReal > 0 ? `Stock: ${stockReal} disponibles` : 'Agotado'}
            </p>
          </div>
          <div class="card-acciones">
            <a href="detalle.html?id=${p.id}" class="btn">Detalles</a>
            <button onclick="agregarAlCarrito(${p.id})" class="btn btn-acento" ${stockReal <= 0 ? 'disabled' : ''}>+ Carrito</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function aplicarFiltros() {
  const texto = document.getElementById('buscador').value.toLowerCase();
  const categoria = document.getElementById('filtro-categoria').value;
  const stockEstado = document.getElementById('filtro-stock').value;
  const orden = document.getElementById('orden-precio').value;

  let filtrados = todosLosProductos.filter(p => {
    const coincideNombre = p.nombre.toLowerCase().includes(texto);
    const coincideCat = categoria === 'todas' || p.categoria === categoria;
    const coincideStock = stockEstado === 'todos' ||
                          (stockEstado === 'disponible' && p.stock > 0) ||
                          (stockEstado === 'agotado' && p.stock === 0);
    return coincideNombre && coincideCat && coincideStock;
  });

  if (orden === 'asc') filtrados.sort((a, b) => a.precio - b.precio);
  if (orden === 'desc') filtrados.sort((a, b) => b.precio - a.precio);

  renderizarProductos(filtrados);
}

document.getElementById('buscador').addEventListener('input', aplicarFiltros);
document.getElementById('filtro-categoria').addEventListener('change', aplicarFiltros);
document.getElementById('filtro-stock').addEventListener('change', aplicarFiltros);
document.getElementById('orden-precio').addEventListener('change', aplicarFiltros);

iniciarCatalogo();
