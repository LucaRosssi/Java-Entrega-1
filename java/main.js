let total = 0;
const listaCarrito = document.getElementById("lista-carrito");
const totalElemento = document.getElementById("total");

// Obtené todos los botones de "Añadir al carro"
const botones = document.querySelectorAll(".btn-primary");

botones.forEach((boton) => {
    boton.addEventListener("click", () => {
        const col = boton.parentElement;
        const titulo = col.querySelector(".titulo").textContent;
        const precioTexto = col.querySelector("p:last-of-type").textContent;
        const precio = parseFloat(precioTexto.replace("$", ""));

        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.textContent = titulo;

        const span = document.createElement("span");
        span.className = "badge bg-primary rounded-pill";
        span.textContent = `$${precio}`;
        li.appendChild(span);

        listaCarrito.appendChild(li);

        total += precio;
        totalElemento.textContent = total;
    });
});