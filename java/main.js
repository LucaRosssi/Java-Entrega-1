let total = 0;
const listaCarrito = document.getElementById("lista-carrito");
const totalElemento = document.getElementById("total");

// Obtiene todos los botones de "Añadir al carro"
const botones = document.querySelectorAll(".btn-primary");

botones.forEach((boton) => {
    boton.addEventListener("click", () => {
        const col = boton.parentElement;
        const titulo = col.querySelector(".titulo").textContent;
        const precioTexto = col.querySelector("p:last-of-type").textContent;
        const precio = parseFloat(precioTexto.replace("$", ""));

        const producto = { titulo, precio };

        // Agregar al DOM
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.textContent = titulo;

        const span = document.createElement("span");
        span.className = "badge bg-primary rounded-pill";
        span.textContent = `$${precio}`;
        li.appendChild(span);

        listaCarrito.appendChild(li);

        // Actualizar total
        total += precio;
        totalElemento.textContent = total;

        // Guardar en Local Storage
        guardarEnLocalStorage(producto);

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `"${titulo}" se añadió al carrito`,
            showConfirmButton: false,
            timer: 1500,
            toast: true
        });
    });
});

function guardarEnLocalStorage(producto) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const btnComprar = document.getElementById("comprar-carrito");

btnComprar.addEventListener("click", () => {
    if (listaCarrito.children.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Su carrito está vacío"});
        return;
    }

    Swal.fire({
        title: "Gracias por su compra",
        icon: "success",
        draggable: true
    });

    // Vaciar el carrito y reiniciar el total
    listaCarrito.innerHTML = "";
    total = 0;
    totalElemento.textContent = total;
    localStorage.removeItem("carrito");
});

const btnVaciar = document.getElementById("vaciar-carrito");

btnVaciar.addEventListener("click", () => {
    // Verificar si el carrito está vacío
    if (listaCarrito.children.length === 0) {
        Swal.fire({
            icon: "info",
            title: "El carrito ya está vacío",
            text: "No hay productos para eliminar.",
            confirmButtonText: "OK"
        });
        return; 
    }

    // Confirmación para vaciar el carrito
    Swal.fire({
        title: "Estás por vaciar el carrito",
        text: "¿Estás seguro de que querés vaciar el carrito?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, borrarlo"
    }).then((result) => {
        if (result.isConfirmed) {
            // Vaciar el carrito
            listaCarrito.innerHTML = "";
            total = 0;
            totalElemento.textContent = total;
            localStorage.removeItem("carrito");

            // Confirmación
            Swal.fire({
                title: "¡Carrito vacío!",
                text: "Tu carrito ha sido vaciado.",
                icon: "success"
            });
        }
    });
});

window.addEventListener("DOMContentLoaded", () => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoGuardado.forEach((producto) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.textContent = producto.titulo;

        const span = document.createElement("span");
        span.className = "badge bg-primary rounded-pill";
        span.textContent = `$${producto.precio}`;
        li.appendChild(span);

        listaCarrito.appendChild(li);

        total += producto.precio;
    });
    totalElemento.textContent = total;
});