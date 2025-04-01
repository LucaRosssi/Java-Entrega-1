const catalogo = [
    { nombre: "1984", precio: 10000, autor: "George Orwell" },
    { nombre: "Dune", precio: 8000, autor: "Frank Herbert" },
    { nombre: "El Principito", precio: 5000, autor: "Antoine De Saint-Exupéry" },
    { nombre: "El Señor de Los Anillos", precio: 12000, autor: "J. R. R. Tolkien" },
    { nombre: "La Divina Comedia", precio: 7000, autor: "Dante Alighieri" },
    { nombre: "Martin Fierro", precio: 15000, autor: "Jose Hernández" }
];

let carrito = []; 

//Función para mostrar el menú
function menu() {
    return catalogo.reduce((mensaje, libro, index) => {
        return mensaje + `${index + 1}. ${libro.nombre} - $${libro.precio} - ${libro.autor}\n`;
    }, "Bienvenido a Compra Books\n\nMenú disponible:\n") + "\nIngrese el número del libro que desea (o 0 para finalizar):";
}

//Función para hacer la compra
function tomarPedido() {
    let opcion;

    do {
        opcion = parseInt(prompt(menu()));

        if (opcion > 0 && opcion <= catalogo.length) {
            const libroSeleccionado = catalogo[opcion - 1];
            carrito.push(libroSeleccionado);
            alert(`${libroSeleccionado.nombre} agregado al carrito`);
        } else if (opcion !== 0) {
            alert("Opción inválida. Intente nuevamente.");
        }

    } while (opcion !== 0);
}

// Función para calcular el precio
function calcularTotal() {
    return carrito.reduce((total, libro) => total + libro.precio, 0).toFixed(2);
}

//Función para mostrar el total
function mostrarCompra() {
    if (carrito.length === 0) {
        alert("No has pedido nada. ¡Hasta luego!");
        return;
    }

    const mensaje = carrito.reduce((resumen, libro) => {
        return resumen + `- ${libro.nombre} - $${libro.precio}\n`;
    }, "Tu pedido:\n");

    alert(mensaje + `\nTotal a pagar: $${calcularTotal()}`);
}

function iniciarSimulador() {
    alert("¡Bienvenido a Compra Books! ");
    tomarPedido();
    mostrarCompra();
}

iniciarSimulador();