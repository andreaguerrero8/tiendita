let cards = document.getElementById('cards');
let cardsPopular = document.getElementById('cardsPopulares');

let modalDetalle = document.getElementById('modalDetalle');
let cardss = document.getElementById('cardss');

let cantidad = 0;
let carrito = [];

let subtotal = 0;
let sumaTotal = 0

let main = document.getElementById('main')
let carritoBtn = document.getElementById('carrito')
let cantidadText = document.getElementById('cantidadText')
let modalBodyCarrito = document.getElementById('modal-body-carrito')
let modalBodyFooter = document.getElementById('modal-footer-carrito')

let btnCloseUno = document.getElementById('btnCloseUno')
let btnCloseDos = document.getElementById('btnCloseDos')
let btnCloseCarro = document.getElementById('btn-close-carro')


let unidades = 1;
localStorage.setItem('Unidades', JSON.stringify(unidades))
let uni = JSON.parse(localStorage.getItem('Unidades'))


let navbarSupportedContent = document.getElementById('navbarSupportedContent')
let ubicacion = document.getElementById('ubicacion')
let form = document.getElementById('form');
let search = document.getElementById('search');


apiProductos = 'https://mytiendaa.herokuapp.com/productos';
apiCiudades = 'https://mytiendaa.herokuapp.com/Ciudades';


document.addEventListener('DOMContentLoaded', (e) => {

    //-------------------mostrar la cantidad de productos en el carrito----------------------------------//
    let hayAlgoLocal = JSON.parse(localStorage.getItem('Carrito'));
    if (hayAlgoLocal !== null) {

        hayAlgoLocal.forEach(element => {

            cantidad = Number(cantidad) + Number(element.cantidad)
        })
        cantidadText.textContent = cantidad

    }
    else {
        cantidad = 0;
        cantidadText.textContent = cantidad
    }

    enviarData(apiProductos);
})


const enviarData = async (url) => {
    const resp = await fetch(url);
    const data = await resp.json();
    mostrarCards(data);
}

//----------------boton carrito-------------------//
carritoBtn.addEventListener('click', (e) => {
    mostrarContenidoCarro()
})



//--------------------mostrar Cards en en main-------------------------//
const mostrarCards = (data) => {

    cards.innerHTML = ''
    cardsPopular.innerHTML = ''

    data.forEach(element => {

        const { nombre, imagen, id, precio, descuento, oferta, categoria } = element;

        if (categoria == 'oferta') {

            cards.innerHTML += `
        
                <div class="tarjetas">
                    <div class="descuento">
                        <h6>${descuento} dto.</h6> 
                    </div>
                   
                    <div class="imgCard">
                        <img src="${imagen}">
                    </div>
                    <div class="divText">
                        <h6 class="precio">$${oferta}/kg <span><del>$${precio}/kg</del></span></h6>
                        <p>${nombre}</p>
                        <br><br>

                    </div>

                    <button id="${id}" class="agregar" data-bs-toggle="modal" data-bs-target="#exampleModalDos">Agregar</button>
                </div>
                
            `
        } else {

            cardsPopular.innerHTML += `

            <div class="tarjetas">
           
                <div class="imgCard">
                    <img src="${imagen}">
                </div>

                <div class="divText">
                    <h6 class="precio">$${precio}</h6>
                    <p>${nombre}</p>
                    <br><br>

                </div>

                <button id="${id}" class="agregar" data-bs-toggle="modal" data-bs-target="#exampleModalDos">Agregar</button>
            </div>
        
            `
        }

    });
}


//-------------modal de datelle--------------//

main.addEventListener('click', async (e) => {
    e.preventDefault();

    let btnDetalle = e.target.classList.contains('agregar');
    let id = e.target.id

    if (btnDetalle) {

        const resp = await fetch(apiProductos);
        const datos = await resp.json();

        //------------filtrado por id del producto seleccionado---------------------//
        const dato = datos.find(list => list.id == Number(id));

        let queHay = JSON.parse(localStorage.getItem('Detalle'));

        if (queHay !== null) {
            localStorage.setItem('Detalle', JSON.stringify(dato))
        }
        else {
            localStorage.setItem('Detalle', JSON.stringify(dato))
        }



        if (dato.categoria == 'oferta') {

            modalDetalle.innerHTML = ''
            modalDetalle.innerHTML += `

                <div class="col-6">
                    <img src="${dato.imagen}" width="95%">
                </div>
                <div class="col-6">
                    <h4>${dato.nombre}</h6>
                    <h6>- $${dato.oferta} /Kg</h6>
                    <p class="iva">Precios con IVA incluido</p>
                    <p class="pesoAprox">Peso aproximado por pieza, puede variar de acuerdo al peso
                        real.</p><br>

                    <h6>Seleccione la madurez que deseas</h6>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Por elegir</option>
                        <option value="1">Maduro (Para Hoy)</option>
                        <option value="2">Normal (3-5 días)</option>
                        <option value="3">Verde (7 días)</option>
                    </select><br>

                    <div class="contBtnsPeso" id="${dato.id}">

                        <div class="pesoBtns"> 
                            <button class="btnPesoDecremento" id="${id}"> - </button>
                            <h4 id="textCantidad">${uni}U</h4>
                            <button class="btnPesoIncremento" id="${id}s"> + </button>
                        </div>

                        <button id="agregarCarrito" class="agregarDetalle">Agregar</button>

                    </div>
                </div>

        `

        } else {

            modalDetalle.innerHTML = ''
            modalDetalle.innerHTML += `

                <div class="col-6">
                    <img src="${dato.imagen}" width="95%">
                </div>
                <div class="col-6">
                    <h4>${dato.nombre}</h6>
                    <h6>- $${dato.precio} /Kg</h6>
                    <p class="iva">Precios con IVA incluido</p>
                    <p class="pesoAprox">Peso aproximado por pieza, puede variar de acuerdo al peso
                        real.</p><br>

                    <h6>Seleccione la madurez que deseas</h6>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Por elegir</option>
                        <option value="1">Maduro (Para Hoy)</option>
                        <option value="2">Normal (3-5 días)</option>
                        <option value="3">Verde (7 días)</option>
                    </select><br>

                    <div class="contBtnsPeso" id="${dato.id}">

                        <div class="pesoBtns"> 
                            <button class="btnPesoDecremento" id="${id}"> - </button>
                            <h4 id="textCantidad">${uni}U</h4>
                            <button class="btnPesoIncremento" id="${id}s"> + </button>
                        </div>

                        <button id="agregarCarrito" class="agregarDetalle">Agregar</button>

                    </div>
                </div>

        `

        }

        //-----------mostrar productos "Productos relacionados" dentro del modal detalle----------------------------//

        datos.forEach(element => {

            const { nombre, imagen, id, precio, descuento, oferta, categoria } = element;

            if (categoria == 'oferta') {

                cardss.innerHTML += `
                            
                    <div class="tarjetasss">
                        <div class="descuentosss">
                            <h6>${descuento} dto.</h6> 
                        </div>
                        
                        <div class="imgCardsss">
                            <img src="${imagen}">
                        </div>

                        <div class="divTextsss">
                            <h6 class="precio">$${oferta}/kg <sapn>$${precio}/kg</sapn></h6>
                            <p>${nombre}</p>
                            <br>
                        </div>
    
                        <button id="${id}" class="agregar" data-bs-toggle="modal" data-bs-target="#exampleModalDos">Agregar</button>
                    </div>
                            
                `
            }
        })
    }
})


modalDetalle.addEventListener('click', (e) => {

    e.preventDefault();

    let btnAgregarCarrito = e.target.classList.contains('agregarDetalle');
    let btnIncremento = e.target.classList.contains('btnPesoIncremento');
    let btnDecremento = e.target.classList.contains('btnPesoDecremento');


    if (btnIncremento) {

        unidades = unidades + 1;
        localStorage.setItem('Unidades', JSON.stringify(unidades));

        let productoHay = JSON.parse(localStorage.getItem('Detalle'));

        productoHay.cantidad = (Number(productoHay.cantidad) + 1)
        localStorage.setItem('Detalle', JSON.stringify(productoHay))


    }


    if (btnDecremento) {

        if (unidades == 1) {
            unidades = 1;
            localStorage.setItem('Unidades', JSON.stringify(unidades));

        } else {
            unidades = unidades - 1;
            localStorage.setItem('Unidades', JSON.stringify(unidades));
        }


        let productoHay = JSON.parse(localStorage.getItem('Detalle'));
        if (productoHay.cantidad == 1) {
            productoHay.cantidad = 1

            localStorage.setItem('Detalle', JSON.stringify(productoHay))
        }
        else {

            productoHay.cantidad = (Number(productoHay.cantidad) - 1)

            localStorage.setItem('Detalle', JSON.stringify(productoHay))

        }

    }

    if (btnAgregarCarrito) {

        let producto = JSON.parse(localStorage.getItem('Detalle'));
        let productoCarro;


        if (producto.categoria == 'oferta') {

            subtotal = producto.oferta * unidades

            productoCarro = {
                nombre: producto.nombre,
                imagen: producto.imagen,
                precio: producto.oferta,
                cantidad: unidades,
                id: producto.id,
                subtotal: subtotal

            }
        } else {
            subtotal = producto.precio * unidades

            productoCarro = {
                nombre: producto.nombre,
                imagen: producto.imagen,
                precio: producto.precio,
                cantidad: unidades,
                id: producto.id,
                subtotal: subtotal

            }
        }

        let llaveCarrito = JSON.parse(localStorage.getItem('Carrito'));


        if (llaveCarrito !== null) {
            llaveCarrito.unshift(productoCarro)
            localStorage.setItem('Carrito', JSON.stringify(llaveCarrito))

            cantidad = Number(cantidad) + Number(producto.cantidad)
            cantidadText.textContent = cantidad

        }
        else {
            carrito.unshift(productoCarro)
            localStorage.setItem('Carrito', JSON.stringify(carrito))

            cantidadText.textContent = producto.cantidad;
            cantidad = producto.cantidad

        }

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `¡Producto Agregado al Carrito! <br>
            Sigue comprando o dirijete al carro para hacer tu pago`,
            showConfirmButton: false,
            timer: 5000
        })

        unidades = 1;
        localStorage.setItem('Unidades', JSON.stringify(unidades))

    }


})


//------------CRUD (CREAR) mostrar datos en el carrito------------------//

const mostrarContenidoCarro = () => {

    let suma = 0;

    //vuelve a revisar el carro
    let datosCarro = JSON.parse(localStorage.getItem('Carrito'));

    if (datosCarro !== null && datosCarro != '') {

        modalBodyCarrito.innerHTML = ''

        datosCarro.forEach(element => {

            const { nombre, precio, imagen, cantidad, id, subtotal } = element;

            suma = suma + subtotal;

            modalBodyCarrito.innerHTML += `
                <div class="modalito">
                    <div>
                        <img src="${imagen}">
                    </div>
                    
                    <div class="textModal">
                        <p>${nombre}</p>
                        <strong><p>$${precio}</p></strong>
                    </div>

                    <div class="pesoCar"> 
                        <button class="btnPesoDecrementoCarro" id="${id}"> - </button>
                        <p id="textCantidad"> ${cantidad}U </p>
                        <button class="btnPesoIncrementoCarro" id="${id}s"> + </button>
                    </div>
                </div> <br>         
            `;
        })


        modalBodyFooter.innerHTML = '';
        modalBodyFooter.innerHTML += ` 
            <div class="vaciar">
                <button class="btnVaciarCanasta">Vaciar canasta</button>
            </div>
            
            <button class="btnPagar"> 
                <p class="p1">${cantidad}</p>
                <strong><a href="./pago.html" id="btnPagar">Ir a Pagar</a></strong>
                <p>$${(suma).toFixed(2)}</p>
            </button>

            `
    } else {

        modalBodyCarrito.innerHTML = ''

        modalBodyCarrito.innerHTML += `
            <div class="CarritoVacio">
                <img src="./images/mujer.png">
                <h3>Tu canasta está vacía</h3>
                <br>
                <button id="btnCarVacio" class="agregarDetalleVacio">Agregar Productos</button>
            </div>
        `
        cantidad = 0
        modalBodyFooter.innerHTML = '';
    }
}

const mostrarCarro = (e) => {

    btnCarritoVacioAgregar = e.target.classList.contains('agregarDetalleVacio');

    ////---------------------(CRUD) ELIMINAR y agregar PRODUCTOS DEL CARRITO---------------------------------------------//

    let btnCarritoEliminar = e.target.classList.contains('btnPesoDecrementoCarro');
    let btnCarritoAgregar = e.target.classList.contains('btnPesoIncrementoCarro');
    let productoCarritoEliminar = JSON.parse(localStorage.getItem('Carrito'));

    if (btnCarritoEliminar) {
        let id = e.target.id
        let filtro = productoCarritoEliminar.find(element => element.id == Number(id));

        productoCarritoEliminar.forEach((elemento, index) => {

            if (elemento.id === filtro.id) {// estoy en el producto a modificar

                if (elemento.cantidad == '1') {
                    productoCarritoEliminar.splice(index, 1)
                    localStorage.setItem('Carrito', JSON.stringify(productoCarritoEliminar))


                    mostrarContenidoCarro()

                } else {

                    let MenosUno = (Number(elemento.cantidad) - 1)
                    let MenosSubtotal = (Number(elemento.subtotal) - Number(elemento.precio))
                    filtro.cantidad = MenosUno;
                    filtro.subtotal = MenosSubtotal

                    console.log(filtro);

                    productoCarritoEliminar.splice(index, 1, filtro)
                    localStorage.setItem('Carrito', JSON.stringify(productoCarritoEliminar))


                    mostrarContenidoCarro()
                }
            }
        })
    } else {
        if (btnCarritoAgregar) {

            let id = ((e.target.id).slice(0, 1))

            console.log(id)
            let filtro = productoCarritoEliminar.find(element => element.id == Number(id));

            productoCarritoEliminar.forEach((elemento, index) => {

                if (elemento.id === filtro.id) {// estoy en el producto a modificar


                    let MasUno = (Number(elemento.cantidad) + 1)
                    let MasSubtotal = (Number(elemento.subtotal) + Number(elemento.precio))
                    filtro.cantidad = MasUno;
                    filtro.subtotal = MasSubtotal

                    console.log(filtro);

                    productoCarritoEliminar.splice(index, 1, filtro)
                    localStorage.setItem('Carrito', JSON.stringify(productoCarritoEliminar))


                    mostrarContenidoCarro()

                }

            })
        }
    }
    //-------------------------------------------------------------------------------------------------------//

    if (btnCarritoVacioAgregar) {
        window.location.reload()
    }

}
////---------------------modal carrito------------------/////
modalBodyCarrito.addEventListener('click', (e) => {

    mostrarCarro(e)

})


modalBodyFooter.addEventListener('click', (e) => {
    let btnVaciarCanasta = e.target.classList.contains('btnVaciarCanasta')

    if (btnVaciarCanasta) {

        Swal.fire({
            title: '¿Seguro?',
            text: "¿Esta seguro que desea vaciar la canasta",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0AC763',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Estoy Seguro!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Canasta Vacía!',
                )

                localStorage.clear()
                mostrarContenidoCarro()
            }
        })



    }

})


btnCloseCarro.addEventListener('click', () => {
    unidades = 1;
    localStorage.setItem('Unidades', JSON.stringify(unidades))
    window.location.reload() // para actualizar la cantidad y se vea la cantidad de productos en el carro

})


search.addEventListener('keyup', async (e) => {

    let divGrandeUbica =  document.getElementById('divGrandeUbica');

    const resp = await fetch(apiCiudades);
    const data = await resp.json();

    let text = e.target.value;

    let filtro = data.filter(element => (element.nombreCiudad).toLowerCase().includes((text).toLowerCase()))


    filtro.forEach(element =>
        {
            divGrandeUbica.innerHTML = `
                              
                <option class="input-icono" id="option" value="${element.nombreCiudad}">
                     ${element.nombreCiudad}
                </option>
            
            
            `
        })
})


let bodyUbica =  document.getElementById('bodyUbica')

bodyUbica.addEventListener('click', (e) =>{

    let btnBuscar = e.target.classList.contains('btnModal');
    let option = document.getElementById('option')
    let ubication = document.getElementById('ubication')

    if (btnBuscar){
        let seleccion = option.value;

        ubication.textContent = seleccion
        
        
    }
})