# Florería Bella Flor - Tienda Virtual Multipágina

## Descripción del Proyecto
Tienda virtual desarrollada con HTML5, CSS3, JavaScript y JSON. Permite explorar un catálogo dinámico de 15 arreglos florales y plantas con precios en bolivianos (Bs), buscar, filtrar, gestionar un carrito de compras con `localStorage` y visualizar estadísticas mediante un Dashboard interactivo.

## Estructura de Carpetas
- `index.html`: Página de inicio con banner, categorías y arreglos destacados.
- `productos.html`: Catálogo completo con buscador, filtros por categoría/disponibilidad y ordenamiento por precio.
- `detalle.html`: Vista individual detallada de cada producto.
- `dashboard.html`: Panel de control con KPIs calculados automáticamente y gráficos con Chart.js.
- `carrito.html`: Gestión de pedidos seleccionados mediante `localStorage`.
- `contacto.html`: Formulario de contacto con validación en JavaScript.
- `nosotros.html` & `faq.html`: Información institucional y preguntas frecuentes.
- `data/productos.json`: Archivo externo de datos en formato JSON (15 productos).
- `css/estilos.css`: Hoja de estilos adaptable (Responsive Design).
- `js/`: Scripts modulares para la carga con `fetch()` y lógica de la tienda.
- `img/`: Recursos gráficos locales (`logo.png`, `banner.jpg`, `nosotros.jpg`, `producto1.jpg` a `producto15.jpg`).

## Instrucciones de Ejecución
1. Abrir la carpeta `TIENDA-VIRTUAL` en Visual Studio Code.
2. Ejecutar `index.html` mediante la extensión **Live Server** para permitir la lectura de `data/productos.json` con `fetch()`.
