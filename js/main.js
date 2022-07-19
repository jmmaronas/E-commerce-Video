console.log("main.js")

const contenedorCards = document.getElementById("containerProduct")
console.log(contenedorCards)
const contenedorTabla = document.getElementById("tablaCarrito")
console.log(contenedorTabla)

function mostrarProductos(array) {
    contenedorCards.innerHTML = ""
    array.forEach(element => {
        contenedorCards.innerHTML += `
            <div class="col mb-5">
                <div class="card h-100">
                    <img class="card-img-top" src="${element.img}" alt="..." />
                    <div class="card-body p-4">
                        <div class="text-center">
                            <h5 class="fw-bolder">${element.nombre}</h5>
                            <p>${element.detalle}</p>
                            $${element.precio}
                        </div>
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center">
                            <button onclick="agregarAlCarrito(${element.id})" class="btn btn-outline-dark mt-auto">Agregar</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    });
}

function mostrarCarrito() {
    let carrito = capturarStorage()
    contenedorTabla.innerHTML = ""
    carrito.forEach(element => {
        contenedorTabla.innerHTML += `.
        <tr>
            <th scope="row">${element.cantidad}</th>
            <td>${element.nombre}</td>
            <td>${element.precio}</td>
            <td><button>x</button></td>
        </tr>       
        `
    })

}

function capturarStorage() {
    return JSON.parse(localStorage.getItem("carrito")) || []
}

function guardarStorage(carritoNuevo) {
    localStorage.setItem("carrito", JSON.stringify(carritoNuevo))
}

function agregarAlCarrito(idParam) {
    let carrito = capturarStorage()
    if (isInCarrito(idParam)) {
        incrementarCantidad(idParam)
    } else {
        const productoEncontrado = productos.find(e => e.id == idParam)
        carrito.push({ ...productoEncontrado, cantidad: 1 })
        guardarStorage(carrito)
        console.log(carrito)
        mostrarCarrito()
    }
}

function incrementarCantidad(id) {
    let carrito = capturarStorage()
    const indice = carrito.findIndex(e => e.id == id)
    carrito[indice].cantidad++
    guardarStorage(carrito)
    mostrarCarrito()
}

function isInCarrito(id) {
    let carrito = capturarStorage()
    return carrito.some(e => e.id == id)
}


mostrarProductos(productos)
mostrarCarrito()