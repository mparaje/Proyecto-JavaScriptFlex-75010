/* Ingreso de nombre de usuario y saludo */

const nombre = prompt("Por favor ingrese su nombre");

const saludar = nombreUsuario =>
    {alert("Hola " + nombreUsuario + ", vamos a cotizar tu presupuesto");};

saludar(nombre);
console.log("Nombre:"+ nombre);
/* Ingreso de seleccion de tipo de producto */

const seleccion = Number(prompt("Seleccione el tipo de producto del que desea obtener presupuesto\n1.Silla 2.Mesa-Escritorio 3.Accesorios 4.Perfileria"));

const encontrarProducto = seleccion =>{
    let productoEncontrado = 0;
    let accesorioEncontrado = 0;
    switch(seleccion)
    {
        case 1: 
            productoEncontrado = "Silla";
            return productoEncontrado;
        case 2: 
            productoEncontrado = "Mesa-Escritorio";
            return productoEncontrado;
        case 3:
            let seleccionAccesorio = Number(prompt("Por favor ingrese que tipo de accesorio desea cotizar\n1.Soporte 2.Llavero"));
            if (seleccionAccesorio == 1){
                accesorioEncontrado = "Soporte";
            }
            else if (seleccionAccesorio == 2){
                accesorioEncontrado = "Llavero";
            }
            else {
                alert("No es una opcion valida");
                break;
            }
            return (accesorioEncontrado);
        case 4:
            productoEncontrado = "Perfileria";
            return productoEncontrado;
        default: 
            alert("No es una opcion valida");
            break;
    }
}

let productoEncontrado = encontrarProducto (seleccion);
console.log ("El producto a cotizar es: " + productoEncontrado);


/* Ingreso de dimensiones del producto en centimetros*/

alert("A continuación te pediremos las dimensiones de tu producto personalizado");
let alto = Number(prompt("Ingrese la altura del producto(en cm)"));
console.log(alto + "cm");
let ancho = Number(prompt("Ingrese el ancho del producto(en cm)"));
console.log(ancho+"cm");
let largo = Number(prompt("Ingrese el largo del producto(en cm)"));
console.log(largo+"cm");

const calcularVolumen = (alto, ancho, largo) =>{
  let volumen = (alto/100)*(ancho/100)*(largo/100);
  return volumen;
};

let volumen = calcularVolumen(alto,ancho,largo);


const calcularCostoMaterial = material => { //Funcion que determina el costo por m3 del materual segun cual elija
    let costoMaterial = 0;
    switch (material) {
    case "1": //Madera xm3
        costoMaterial = 15000;
        break;
    case "2": //Plastico xm3
        costoMaterial = 20000;
        break;
    case "3": //Aluminio xm3
        costoMaterial = 10000;
        break;
    case "4": //Hormigon xm3
        costoMaterial = 25000;
        break;
    default:
        alert("No es un material valido")
        break;
  }
  
  return costoMaterial;
}

/* Ingreso de materiales que quiere emplear en el producto. Se puede ingresar mas de uno*/


let contadorMateriales = 0;
let costoMaterial = 0;
let costoPromedioMaterial = 0;
let materialSeleccionado = 0;

do{
    materialSeleccionado = prompt("Ingrese los materiales que desea emplear en su producto. Escriba 0 cuando haya terminado de ingresar\n(1.Madera - 2.Plastico - 3.Aluminio - 4.Concreto/Hormigon)");
    if(materialSeleccionado === "0"){
      break;
    }
    costoMaterial+=calcularCostoMaterial(materialSeleccionado); //Los costos de los materiales se van sumando segun la funcion hecha anteriormente y se guarda en la variable costMaterial
    contadorMateriales++;
    costoPromedioMaterial = (costoMaterial/contadorMateriales);//Esto lo realizo ya que necesito el costo promedio por m3. Sumo los costos y divido por la cantidad de materiales seleccionados. Le resto uno ya que una seleccion es la opcion 5 para salir del bucle. 
}
while(materialSeleccionado !== "0")

 
console.log("El costo del material aproximado por m3 es "+ costoPromedioMaterial);

/*Seleccion del estilo del producto para determinar el costo de desarrollo. Mas adelante habra opciones para cada tipo de producto*/


let estilo= prompt("Por favor elija entre estas imagenes, el estilo del producto que desea.\n.A .B .C .D .E .F"); //supongamos que hay imagenes para elegir por cada tipo de producto
console.log("La seleccion del estilo es " + estilo);

let cantidad= Number(prompt("Ingrese la cantidad del mismo producto que necesita"));
console.log("La cantidad es " + cantidad);

/*Tiene que haber varias funciones Calc_Cost_Desarrollo por cada producto, ya que varian los estilos y la complejidad segun el tipo, pero en este caso es de ejemplo ya que no hay estilos definidos*/

const calcularCostoDesarrollo = (estilo, producto, cantidad) => {
  let costoEstilo = 0;
  let disenio, manoDeObra;
  if (producto == "Silla" || producto == "Mesa") {
    disenio = 25000;
    manoDeObra = 25000 * cantidad;
  }
  else if (producto == "Perfileria") {
    disenio = 20000;
    manoDeObra = 15000 * cantidad;
  }
  else {
    producto == "Soporte" ? manoDeObra = 10000 * cantidad : manoDeObra = 5000 * cantidad;
    disenio = 10000;
  }

  switch (estilo) {
    case "A":
      costoEstilo = 10000;
      break;
    case "B":
      costoEstilo = 20000;
      break;
    case "C":
      costoEstilo = 30000;
      break;
    case "D":
      costoEstilo = 40000;
      break;
    case "E":
      costoEstilo = 50000;
      break;
    case "F":
      costoEstilo = 60000;
      break;
    default:
      alert("No es una opcion valida");
      break;
  }
  return costoEstilo + disenio + manoDeObra;
}

let costoDesarrollo = calcularCostoDesarrollo(estilo,productoEncontrado,cantidad);
console.log("El costo del desarrollo del diseño aproximado es "+ costoDesarrollo);

/* Funcion de Cotizacion final del producto pedido */


const calcularCotizacion = (volumen, costoDesarrollo, costoMaterialPromedio, cantidad) => {
    let costoTotal = (volumen * costoMaterialPromedio * cantidad) + costoDesarrollo;
    return costoTotal;
  };

let costoTotal = calcularCotizacion(volumen, costoDesarrollo, costoPromedioMaterial, cantidad);

alert("El costo total de tu pedido sería aproximadamente de $"+costoTotal+"\nRecuerde que estos valores pueden variar según la complejidad de su diseño y el nivel de detalles que necesita darle.\nSi quiere un presupuesto más detallado, no dude en contactarnos.\nMuchas gracias!")
console.log("El costo total es:" + costoTotal);