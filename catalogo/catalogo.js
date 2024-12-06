const productosCatalogo = [
    {
      id: 1,
      category: "Inmobiliaria",
      description: "Una computadora portátil con procesador Intel Core i7.",
      image: "https://via.placeholder.com/100",
      price: 1199.99,
      title: "Silla moderna",
    },
    {
      id: 2,
      category: "Inmobiliaria",
      description: "Una computadora portátil con procesador Intel Core i7.",
      image: "https://via.placeholder.com/100",
      price: 1199.99,
      title: "escritorio con soporte",
    },
    {
      id: 3,
      category: "Inmobiliaria",
      description: "Una computadora portátil con procesador Intel Core i7.",
      image: "https://via.placeholder.com/100",
      price: 1199.99,
      title: "llavero institucional",
    },
    {
      id: 4,
      category: "Inmobiliaria",
      description: "Una computadora portátil con procesador Intel Core i7.",
      image: "https://via.placeholder.com/100",
      price: 1199.99,
      title: "perfil para carteleria",
    },
  ];
  
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  /* 
  const encontrarProducto = (productoDeEntrada) =>{
    productoDeEntrada.addEventListener("input", (evento) => {
      const entrada= evento.target;
      if (entrada && entrada.value) { // Verifica si el valor no es undefined o null
        let productoBuscado = entrada.value.toLowerCase();
        let productoEncontrado = productosCatalogo.filter((producto) =>
          producto.title.toLowerCase().includes(productoBuscado)
        );
        renderProductosCatalogo(productoEncontrado);
      } else {
        console.error("El valor del campo de entrada no está definido.");
      }
      renderProductosCatalogo(productosCatalogo);
    });
  };*/
  
  const renderProductosCatalogo = (productos) => {
    let contenedorProductos = document.getElementById("productos-contenedor");
    contenedorProductos.innerHTML = "";
  
    productos.forEach((producto) => {
      let productoCard = document.createElement("div");
      productoCard.className = "producto-catalogo";
      productoCard.innerHTML = `<img src=${producto.image} />
          <h3>${producto.title}</h3>
          <p>${producto.description}</p>
          <p class="price">$${producto.price}</p>
          <button onclick="agregarAlCarrito(${producto.id})">
          Agregar al carrito</button>
      `;
      contenedorProductos.appendChild(productoCard);
    });
  };
  
  renderProductosCatalogo(productosCatalogo);
  
  const agregarAlCarrito = (id) => {
    let producto = productosCatalogo.find((elemento) => elemento.id === id);
    let productoEnCarrito = carrito.find((elemento) => elemento.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1; // Aumenta la cantidad si ya está en el carrito
    } else {
        carrito.push({...producto, cantidad: 1 }); // Añade el producto con cantidad inicial de 1
    }
      localStorage.setItem("carrito", JSON.stringify(carrito));
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