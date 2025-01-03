let productosCatalogo = [];  

  document.addEventListener("DOMContentLoaded", () => {
    const getProducts = fetch("https://fakestoreapi.com/products");
    getProducts
     .then((res) => res.json())
     .then((res) => {
       productosCatalogo = res;
       renderProductosCatalogo(productosCatalogo);
    });
 });


  
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
  const renderProductosCatalogo = (productos) => {
    let contenedorProductos = document.getElementById("productos-contenedor");
    contenedorProductos.innerHTML = "";
  
    productos.forEach((producto) => {
      let productoCard = document.createElement("div");
      productoCard.className = "producto-catalogo card";
      productoCard.innerHTML = `<img src=${producto.image} />
          <h3 class="title-card">${producto.title}</h3>
          <p class="price">$${producto.price}</p>
          <button class="btn-add-carrito" onclick="agregarAlCarrito(${producto.id})">
          Add to cart</button>
      `;
      contenedorProductos.appendChild(productoCard);
    });
  };
  
  const agregarAlCarrito = (id) => {
    let producto = productosCatalogo.find((elemento) => elemento.id === id);
    let productoEnCarrito = carrito.find((elemento) => elemento.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1; // Aumenta la cantidad si ya está en el carrito
    } else {
        carrito.push({...producto, cantidad: 1 }); // Añade el producto con cantidad inicial de 1
    }
      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarContadorCarrito();
};
  
const entradaBuscador= document.getElementById("buscador");
if (entradaBuscador) {
    entradaBuscador.addEventListener("input", (evento) => {
        let value = evento.target.value.toLowerCase();
        let productosFiltrados = productosCatalogo.filter((producto) =>
        producto.title.toLowerCase().includes(value)
        );
        renderProductosCatalogo(productosFiltrados);
    });
}

const actualizarContadorCarrito =() => {
  const contadorElemento = document.getElementById('cart-count');
  const cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);
  contadorElemento.textContent = cantidadTotal;
}

renderProductosCatalogo(productosCatalogo);

