let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const renderProductosCarrito = (productosCarrito) => {
  let carritoContenedor = document.getElementById("carrito-productos");
  carritoContenedor.innerHTML = "";

  productosCarrito.forEach((productoCarrito) => {
    // Verificar que la ruta de la imagen no sea undefined
    let productCard = document.createElement("div");
    productCard.className = "producto-carrito card";
    productCard.innerHTML = `<img src=${productoCarrito.image} />
          <h3 class="title-card">${productoCarrito.title}</h3>
          <p class="price">$${productoCarrito.price}</p>
          <div class="btns-contenedor-carrito">
            <button onclick="restarCantidad(${productoCarrito.id})">-</button>
            <p class="price">${productoCarrito.cantidad}</p>
            <button onclick="sumarCantidad(${productoCarrito.id})">+</button>
          </div>
          <button class="btn-eliminar" onclick="eliminarDelCarrito(${productoCarrito.id})">
          Delete</button>
      `;
    carritoContenedor.appendChild(productCard);
  });
  document.getElementById('total-compra').textContent = actualizarResumenCarrito();
  actualizarContadorCarrito();
};


const eliminarDelCarrito = (id) => {
  carrito = carrito.filter((elemento) => elemento.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderProductosCarrito(carrito);
  actualizarContadorCarrito();
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
  actualizarContadorCarrito();
};

const sumarCantidad = (id) => {
  let productoEncontrado = carrito.find((elemento) => elemento.id === id);
  if (productoEncontrado) {
    productoEncontrado.cantidad += 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderProductosCarrito(carrito);
    actualizarContadorCarrito();
  }
};

const calcularTotal = () => {
  return carrito.reduce((total, producto) => total + producto.price * producto.cantidad, 0).toFixed(2);
};

const generarResumenCarrito = () => {
  let resumen = `<h4 class="title-resumen">Order Summary\n\n</h4>`;
  let total = 0;

  carrito.forEach(item => {
    const subtotal = item.price * item.cantidad;
    resumen += `<strong>${item.title}</strong> x ${item.cantidad} = $${subtotal.toFixed(2)}\n\n`;
    total += subtotal;
  });

  resumen += `\nTotal: $${total.toFixed(2)}`;
  return resumen;
}

const actualizarResumenCarrito= () => {
  const resumenElement = document.getElementById('resumen-carrito');
  if (resumenElement) {
    resumenElement.innerHTML = generarResumenCarrito().replace(/\n/g, '<br>');
  }
}

function confirmarCompra() {
  if (carrito.length > 0) {
    const total = calcularTotal();
    Swal.fire({
      title: `¿Estás seguro de que deseas confirmar tu compra por $${total}?`,
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.fire({
          title: "Gracias por su compra",
          icon: "success",
          iconColor: "black",
          confirmButtonColor: "black",
          position: "center",
        })
        carrito.length = 0; // Vaciar el carrito
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderProductosCarrito(carrito);
        document.getElementById('total-compra').textContent = 'Total: $0.00';
    }
    })
      
      // Aquí podrías agregar código adicional, como redirigir a una página de confirmación
  }
  else{
    Swal.fire({
      title: "Tu carrito esta vacío. Añade productos para continuar",
      confirmButtonColor: "black",
      position: "center",
    })  
  }
}

const inicializarCarrito = () => {
  const botonConfirmar = document.getElementById('confirmar-compra');
  if (botonConfirmar) {
    botonConfirmar.addEventListener('click', confirmarCompra);
  }
  renderProductosCarrito(carrito);
  actualizarContadorCarrito();
}

const actualizarContadorCarrito =() => {
  const contadorElemento = document.getElementById('cart-count');
  const cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);
  contadorElemento.textContent = cantidadTotal;
}


renderProductosCarrito(carrito);
inicializarCarrito();

