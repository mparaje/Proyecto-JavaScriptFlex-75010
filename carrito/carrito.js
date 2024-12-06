let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

console.log(carrito);

const renderProductosCarrito = (productosCarrito) => {
  let carritoContenedor = document.getElementById("carrito-contenedor");
  carritoContenedor.innerHTML = "";

  productosCarrito.forEach((productoCarrito) => {
    // Verificar que la ruta de la imagen no sea undefined
    let productCard = document.createElement("div");
    productCard.className = "producto-carrito";
    productCard.innerHTML = `<img src=${productoCarrito.image} />
          <h3>${productoCarrito.title}</h3>
          <p>${productoCarrito.description}</p>
          <p class="price">$${productoCarrito.price}</p>
          <div class="btns-contenedor">
            <button onclick="restarCantidad(${productoCarrito.id})">-</button>
            <p class="price">${productoCarrito.cantidad}</p>
            <button onclick="sumarCantidad(${productoCarrito.id})">+</button>
          </div>
          <button onclick="eliminarDelCarrito(${productoCarrito.id})">
          Eliminar</button>
      `;
    carritoContenedor.appendChild(productCard);
  });
};

renderProductosCarrito(carrito);

const eliminarDelCarrito = (id) => {
  carrito = carrito.filter((elemento) => elemento.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderProductosCarrito(carrito);
};

const restarCantidad = (id) => {
  let productoEncontrado = carrito.find((elemento) => elemento.id === id);
  if (productoEncontrado && productoEncontrado.cantidad > 1) {
    productoEncontrado.cantidad -= 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderProductosCarrito(carrito);
  } else if (productoEncontrado && productoEncontrado.cantidad === 1) {
    eliminarDelCarrito(productoEncontrado.id);
  }
};

const sumarCantidad = (id) => {
  let productoEncontrado = carrito.find((elemento) => elemento.id === id);
  if (productoEncontrado) {
    productoEncontrado.cantidad += 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderProductosCarrito(carrito);
  }
};

const calcularTotal = () => {
  return carrito.reduce((total, producto) => total + producto.price * producto.cantidad, 0).toFixed(2);
};

const confirmarCompra = () =>{
  if(carrito.lenght > 0){
    const total = calcularTotal();
    return `<p>El total es $${total}</p>`;
  }
  else{
    return "<p>Tu carrito esta vacio</p>";
  }
}

const inicializarCarrito = () => {
  const botonConfirmar = document.getElementById('btn-confirmar');
  if (botonConfirmar) {
    botonConfirmar.addEventListener('click', confirmarCompra);
  }
  renderProductosCarrito(carrito);
}