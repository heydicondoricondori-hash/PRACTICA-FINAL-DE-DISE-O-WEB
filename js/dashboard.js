async function cargarDashboard() {
  const res = await fetch('data/productos.json');
  const productos = await res.json();

  const ahora = new Date();
  document.getElementById('fecha-actualizacion').textContent = `Actualizado: ${ahora.toLocaleDateString()} ${ahora.toLocaleTimeString()}`;

  const totalProductos = productos.length;
  const categoriasUnicas = [...new Set(productos.map(p => p.categoria))];
  const valorInventario = productos.reduce((acc, p) => acc + (p.precio * p.stock), 0);
  const disponibles = productos.filter(p => p.stock > 0).length;
  const agotados = productos.filter(p => p.stock === 0).length;
  const bajoStock = productos.filter(p => p.stock > 0 && p.stock <= 4).length;
  const stockNormal = productos.filter(p => p.stock > 4).length;

  document.getElementById('kpi-total').textContent = totalProductos;
  document.getElementById('kpi-categorias').textContent = categoriasUnicas.length;
  document.getElementById('kpi-valor').textContent = `${valorInventario.toLocaleString()} Bs`;
  document.getElementById('kpi-disponibles').textContent = disponibles;
  document.getElementById('kpi-bajo').textContent = bajoStock;
  document.getElementById('kpi-agotados').textContent = agotados;

  // Gráfico 1: Productos por categoría (Barras HTML + CSS)
  const contCategorias = document.getElementById('graficoCategorias');
  contCategorias.innerHTML = categoriasUnicas.map(cat => {
    const cantidad = productos.filter(p => p.categoria === cat).length;
    const porcentaje = Math.round((cantidad / totalProductos) * 100);
    return `
      <div style="margin-bottom: 1rem;">
        <div style="display:flex; justify-content:space-between; font-weight:600; margin-bottom:4px;">
          <span>${cat}</span>
          <span>${cantidad} prod. (${porcentaje}%)</span>
        </div>
        <div style="background:#ede7f6; border-radius:8px; height:22px; overflow:hidden;">
          <div style="background:#6b4c9a; width:${porcentaje}%; height:100%; border-radius:8px; transition: width 0.5s;"></div>
        </div>
      </div>
    `;
  }).join('');

  // Gráfico 2: Distribución de Stock (Barras HTML + CSS)
  const datosStock = [
    { etiqueta: 'Stock Normal (>4 unid.)', valor: stockNormal, color: '#10b981' },
    { etiqueta: 'Bajo Stock (1 - 4 unid.)', valor: bajoStock, color: '#ff5e7e' },
    { etiqueta: 'Agotados (0 unid.)', valor: agotados, color: '#e63946' }
  ];

  const contStock = document.getElementById('graficoStock');
  contStock.innerHTML = datosStock.map(item => {
    const porcentaje = Math.round((item.valor / totalProductos) * 100);
    return `
      <div style="margin-bottom: 1rem;">
        <div style="display:flex; justify-content:space-between; font-weight:600; margin-bottom:4px;">
          <span>${item.etiqueta}</span>
          <span>${item.valor} prod. (${porcentaje}%)</span>
        </div>
        <div style="background:#ede7f6; border-radius:8px; height:22px; overflow:hidden;">
          <div style="background:${item.color}; width:${porcentaje}%; height:100%; border-radius:8px; transition: width 0.5s;"></div>
        </div>
      </div>
    `;
  }).join('');

  // Tabla de bajo inventario o agotados
  const criticos = productos.filter(p => p.stock <= 4);
  const tbody = document.getElementById('tabla-bajo-stock');
  tbody.innerHTML = criticos.map(p => `
    <tr>
      <td>#${p.id}</td>
      <td>${p.nombre}</td>
      <td>${p.categoria}</td>
      <td>${p.precio} Bs</td>
      <td style="color:${p.stock === 0 ? '#e63946' : '#ff5e7e'}; font-weight:bold;">
        ${p.stock === 0 ? 'AGOTADO (0)' : `${p.stock} unid.`}
      </td>
    </tr>
  `).join('');
}

cargarDashboard();
