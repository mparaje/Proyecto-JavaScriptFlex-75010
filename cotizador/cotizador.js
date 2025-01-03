let productosPorDiseniar = [];
let materiales = [];
let estilos = [];


document.addEventListener("DOMContentLoaded", () => {
  const getData = fetch("./data.json");
  getData
   .then((res) => res.json())
   .then((res) => {
     productosPorDiseniar = res.productos;
     materiales = res.materiales;
     estilos = res.estilos;
  });
});

const limpiarDOM = (exceptId) => {
    const contenedores = [
      "btn-categorias",
      "btn-productos",
      "btn-materiales",
      "input-dimensiones",
      "btn-estilos",
      "input-cantidad",
      "resultado-cotizacion"
    ];
    
    contenedores.forEach(id => {
      if (id !== exceptId) {
        const elemento = document.getElementById(id);
        if (elemento) {
          elemento.innerHTML = '';
        }
      }
    });
};
  
const mostrarSeleccionPrevia = (contenedorId) => {
    //const contenedor = document.getElementById(contenedorId);
    //contenedor.innerHTML = `<p>${titulo}</p>`;
    /////
    const contenedor = document.getElementById(contenedorId);
    const selecciones = JSON.parse(localStorage.getItem("selecciones")) || {};
    
    contenedor.innerHTML = '';
    let seleccionText = "";

    switch(contenedorId) {
        case "btn-categorias":
            if (selecciones.categoriaSeleccionada) {
                seleccionText = `Categoría: ${selecciones.categoriaSeleccionada}`;
            }
            break;
        case "btn-productos":
            if (selecciones.productoSeleccionado) {
                const producto = productosPorDiseniar.find(p => p.id === selecciones.productoSeleccionado);
                if (producto) {
                    seleccionText = `Producto: ${producto.title}`;
                }
            }
            break;
        case "btn-materiales":
            if (selecciones.materialSeleccionado) {
                const material = materiales.find(m => m.id === selecciones.materialSeleccionado);
                if (material) {
                    seleccionText = `Material: ${material.title}`;
                }
            }
            break;
        case "input-dimensiones":
            if (selecciones.dimensionesSeleccionadas) {
                const { largo, ancho, alto } = selecciones.dimensionesSeleccionadas;
                seleccionText = `Dimensiones: ${largo}cm x ${ancho}cm x ${alto}cm`;
            }
            break;
        case "btn-estilos":
            if (selecciones.estiloSeleccionado) {
                const estilo = estilos.find(e => e.id === selecciones.estiloSeleccionado);
                if (estilo) {
                    seleccionText = `Estilo: ${estilo.title}`;
                }
            }
            break;
        case "input-cantidad":
            if (selecciones.cantidadSeleccionada) {
                seleccionText = `Cantidad: ${selecciones.cantidadSeleccionada} unidades`;
            }
            break;
    }
  
    contenedor.innerHTML = seleccionText;
};
  
const crearBotones = (opciones) => {
    const {
      contenedorId,
      items,
      itemKeyForDisplay,
      itemKeyForValue,
      onSelectItem,
      onContinue,
      onBack,
      storageKey,
    } = opciones;
  
    const contenedor = document.getElementById(contenedorId);
  
    let seleccionActual = null;
  
    items.forEach(item => {
      const btn = document.createElement("button");
      btn.className = "btn-style";
      btn.textContent = item[itemKeyForDisplay];
      btn.addEventListener("click", () => {
        seleccionActual = item[itemKeyForValue];
        contenedor.querySelectorAll('button').forEach(b => b.classList.remove('seleccionado'));
        btn.classList.add('seleccionado');
      });
      contenedor.appendChild(btn);
    });
  
    const botonesControl = document.createElement("div");
    botonesControl.className = "contenedor-btn-continuar-volver";
    
    const btnContinuar = document.createElement("button");
    btnContinuar.textContent = "Continuar";
    btnContinuar.className="btn-style";
    btnContinuar.addEventListener("click", () => {
      if (seleccionActual) {
        onSelectItem(seleccionActual);
        //localStorage.setItem(storageKey, JSON.stringify(seleccionActual));
        const selecciones = JSON.parse(localStorage.getItem("selecciones")) || {};
        selecciones[storageKey] = seleccionActual;
        localStorage.setItem("selecciones", JSON.stringify(selecciones));
        //////
        mostrarSeleccionPrevia(contenedorId);
        onContinue(seleccionActual);
      } else {
        console.log(`Por favor, selecciona un ${storageKey} primero.`);
      }
    });
    
    const btnVolver = document.createElement("button");
    btnVolver.textContent = "Volver";
    btnVolver.className="btn-style";
    btnVolver.addEventListener("click", () => {
      onBack();
    });
    botonesControl.appendChild(btnContinuar);
    botonesControl.appendChild(btnVolver);
    contenedor.appendChild(botonesControl);
}

const seleccionarItem = (storageKey, valor) => {
    //localStorage.setItem(storageKey, JSON.stringify(valor));
    const selecciones = JSON.parse(localStorage.getItem("selecciones")) || {};
    selecciones[storageKey] = valor;
    localStorage.setItem("selecciones", JSON.stringify(selecciones));
    /////// 
    let titulo;
    switch(storageKey) {
        case "categoriaSeleccionada":
            titulo = valor;
            break;
        case "productoSeleccionado":
            titulo = productosPorDiseniar.find(p => p.id === valor)?.title;
            break;
        case "materialSeleccionado":
            titulo = materiales.find(m => m.id === valor)?.title;
            break;
        case "estiloSeleccionado":
            titulo = estilos.find(e => e.id === valor)?.title;
            break;
        default:
            titulo = valor;
    }
    
    console.log(`${storageKey}:`, titulo);
};

const comenzarCotizacion = () => {
    limpiarDOM();
    localStorage.removeItem("selecciones");
    const btnComienzoCotizador = document.getElementById("btn-cotizador");
    btnComienzoCotizador.addEventListener("click", crearBotonesDeCategorias);
};

const crearBotonesDeCategorias = () => {
    const categorias = [...new Set(productosPorDiseniar.map(producto => producto.category))];
    const contenedor = document.getElementById("btn-categorias");
    contenedor.innerHTML =`
    <h3>Selecciona la categoria a la que pertenece su producto</h3>
    `;
    crearBotones({
        contenedorId: "btn-categorias",
        items: categorias.map(cat => ({ category: cat })),
        itemKeyForDisplay: "category",
        itemKeyForValue: "category",
        onSelectItem: (categoria) => seleccionarItem("categoriaSeleccionada", categoria),
        onContinue: crearBotonesDeProductos,
        onBack: () => console.log("Volviendo al inicio..."),
        storageKey: "categoriaSeleccionada",
    });
};
  
const crearBotonesDeProductos = () => {
    //const categoriaSeleccionada = JSON.parse(localStorage.getItem("categoriaSeleccionada"));
    const selecciones = JSON.parse(localStorage.getItem("selecciones")) || {};
    const categoriaSeleccionada = selecciones.categoriaSeleccionada;
    //////
    
    const productos = productosPorDiseniar.filter(producto => producto.category === categoriaSeleccionada);
    const contenedor = document.getElementById("btn-productos");
    contenedor.innerHTML =`
    <h3>Selecciona el producto que desea cotizar</h3>
    `;
    crearBotones({
      contenedorId: "btn-productos",
      items: productos,
      itemKeyForDisplay: "title",
      itemKeyForValue: "id",
      onSelectItem: (productoId) => seleccionarItem("productoSeleccionado", productoId),
      onContinue: crearBotonesDeMateriales,
      onBack: crearBotonesDeCategorias,
      storageKey: "productoSeleccionado",
    });
};
  
const crearBotonesDeMateriales = () => {
    const contenedor = document.getElementById("btn-materiales");
    contenedor.innerHTML =`
    <h3>Selecciona el material que desea para su producto</h3>
    `;

    crearBotones({
      contenedorId: "btn-materiales",
      items: materiales,
      itemKeyForDisplay: "title",
      itemKeyForValue: "id",
      onSelectItem: (materialId) => seleccionarItem("materialSeleccionado", materialId),
      onContinue: crearInputsDeDimensiones,
      onBack: crearBotonesDeProductos,
      storageKey: "materialSeleccionado",
    });
    
  };

const crearInputsDeDimensiones = () => {
    const contenedor = document.getElementById("input-dimensiones");
    contenedor.innerHTML = `
        <h3>Ingrese las dimensiones del producto en cm</h3>
        <div>
        <label for="largo">Largo (cm):</label>
        <input type="number" id="largo" min="0" step="0.1">
        </div>
        <div>
        <label for="ancho">Ancho (cm):</label>
        <input type="number" id="ancho" min="0" step="0.1">
        </div>
        <div>
        <label for="alto">Alto (cm):</label>
        <input type="number" id="alto" min="0" step="0.1">
        </div>
        <div class="contenedor-btn-continuar-volver">
        <button id="btn-cont-dimensiones">Continuar</button>
        <button id="btn-volv-dimensiones">Volver</button>
        </div>
    `;
    
    document.getElementById("btn-cont-dimensiones").addEventListener("click", () => {
        const largo = parseFloat(document.getElementById("largo").value);
        const ancho = parseFloat(document.getElementById("ancho").value);
        const alto = parseFloat(document.getElementById("alto").value);
    
        if (isNaN(largo) || isNaN(ancho) || isNaN(alto)) {
        console.log("Por favor, ingrese valores válidos para todas las dimensiones.");
        return;
        }
    
        const dimensiones = { largo, ancho, alto };
        const selecciones = JSON.parse(localStorage.getItem("selecciones")) || {};
        selecciones.dimensionesSeleccionadas = dimensiones;
        localStorage.setItem("selecciones", JSON.stringify(selecciones));
        console.log("Dimensiones guardadas:", dimensiones);
        mostrarSeleccionPrevia("input-dimensiones");
        crearBotonesDeEstilos();
    });
    
    document.getElementById("btn-volv-dimensiones").addEventListener("click", ()=>{
        crearBotonesDeMateriales();
    });
};

const crearBotonesDeEstilos = () => {
    const contenedor = document.getElementById("btn-estilos");
    contenedor.innerHTML =`
    <h3>Selecciona el estilo que desea para su producto</h3>
    `;
    crearBotones({
      contenedorId: "btn-estilos",
      items: estilos,
      itemKeyForDisplay: "title",
      itemKeyForValue: "id",
      onSelectItem: (estiloId) => seleccionarItem("estiloSeleccionado", estiloId),
      onContinue: crearInputDeCantidad,
      onBack: crearInputsDeDimensiones,
      storageKey: "estiloSeleccionado",
    });
  };

const crearInputDeCantidad = () => {
    const contenedor = document.getElementById("input-cantidad");
    contenedor.innerHTML = `
        <h3>Ingrese la cantidad del producto que desea</h3>
        <div>
        <label for="cantidad">Cantidad (en unidades):</label>
        <input type="number" id="cantidad" min="0" step="0.1">
        </div>
        <div class="contenedor-btn-continuar-volver">
        <button id="btn-cont-cantidad">Continuar</button>
        <button id="btn-volv-cantidad">Volver</button>
        </div>
    `;
    
    const btnContCantidad = document.getElementById("btn-cont-cantidad");
    const btnVolvCantidad = document.getElementById("btn-volv-cantidad");
    
    if(btnContCantidad){
        btnContCantidad.addEventListener("click", () => {
            const cantidad = parseFloat(document.getElementById("cantidad").value);
        
            if (isNaN(cantidad)|| cantidad < 1) {
                console.log("Por favor, ingrese valores válidos");
                return;
            }
            const selecciones = JSON.parse(localStorage.getItem("selecciones")) || {};
            selecciones.cantidadSeleccionada = cantidad;
            localStorage.setItem("selecciones", JSON.stringify(selecciones));
            console.log("Cantidad:", cantidad);
            mostrarSeleccionPrevia("input-cantidad");
            limpiarDOM("input-cantidad");
            calcularCostoTotal();
        });
    } else{
        console.error("Botón 'btn-cont-cantidad' no encontrado.");
    }
    if (btnVolvCantidad) {
        btnVolvCantidad.addEventListener("click", () => {
            limpiarDOM();
            crearBotonesDeEstilos();
        });
    } else {
        console.error("Botón 'btn-volv-cantidad' no encontrado.");
    }
};

const calcularCostoTotal = () => {
    const selecciones = JSON.parse(localStorage.getItem("selecciones")) || {};
    const categoriaSeleccionada = selecciones.categoriaSeleccionada;
    const productoId = selecciones.productoSeleccionado;
    const materialId = selecciones.materialSeleccionado;
    const dimensiones = selecciones.dimensionesSeleccionadas;
    const estiloId = selecciones.estiloSeleccionado;
    const cantidad = selecciones.cantidadSeleccionada;

    const producto = productosPorDiseniar.find(p => p.id === productoId);
    const material = materiales.find(m => m.id === materialId);
    const estilo = estilos.find(e => e.id === estiloId);

    const volumen = (dimensiones.largo * dimensiones.ancho * dimensiones.alto) / 1000000; // convertir de cm³ a m³
    const costoMaterial = volumen * material.costoPorMetroCubico;

    const costoDesarrollo = producto.costoDisenio + producto.costoMaquinaria + (producto.costoManoDeObra * cantidad) + estilo.costoEstilo;

    const costoTotal = costoDesarrollo + (costoMaterial * cantidad);

    const productoACotizar = {
        categoria: categoriaSeleccionada,
        producto: producto.title,
        material: material.title,
        dimensiones: dimensiones,
        estilo: estilo.title,
        cantidad: cantidad,
        price: costoTotal,
    };

    console.log("Producto a cotizar:", productoACotizar);
    console.log("Costo total aproximado", productoACotizar.price);

    actualizarSeleccionesPrevias();
    mostrarResultadoCotizacion(productoACotizar);
};

const mostrarResultadoCotizacion = (productoACotizar) => {
    const contenedor = document.getElementById("resultado-cotizacion");
    contenedor.innerHTML = `
        <h2>Resultado de la Cotización</h2>
        <p>Costo total aproximado: $${productoACotizar.price.toFixed(2)}</p>
        <button id="btn-nueva-cotizacion" class="btn-style">Nueva Cotización</button>
    `;

    document.getElementById("btn-nueva-cotizacion").addEventListener("click", () => {
        localStorage.clear();
        limpiarDOM();
        comenzarCotizacion();
    });
};

const actualizarSeleccionesPrevias = () => {
    const contenedores = [
        "btn-categorias",
        "btn-productos",
        "btn-materiales",
        "input-dimensiones",
        "btn-estilos",
        "input-cantidad"
    ];

    contenedores.forEach(contenedorId => {
        mostrarSeleccionPrevia(contenedorId);
    });
};

limpiarDOM();
comenzarCotizacion();
