let cards = document.getElementById('cards');
let cardsPopular = document.getElementById('cardsPopulares');

let modalDetalle = document.getElementById('modalDetalle');
let cardss = document.getElementById('cardss');

let cantidad = 0;
let unidades= 1;
let carrito = [];
let suma = 0;

let main = document.getElementById('main')
let carritoBtn =  document.getElementById('carrito')
let cantidadText =  document.getElementById('cantidadText')
let modalBodyCarrito =  document.getElementById('modal-body-carrito')
let modalBodyFooter =  document.getElementById('modal-footer-carrito')

let btnCloseUno = document.getElementById('btnCloseUno')
let btnCloseDos = document.getElementById('btnCloseDos')
let btnCloseCarro = document.getElementById('btn-close-carro')





document.addEventListener('DOMContentLoaded', (e) => {

    //-------------------mostrar la cantidad de productos en el carrito----------------------------------//
    let hayAlgoLocal = JSON.parse(localStorage.getItem('Carrito'));
        if (hayAlgoLocal !== null) {
            
            hayAlgoLocal.forEach(element=>{

                cantidad = Number(cantidad) + Number(element.cantidad)
            })
            cantidadText.textContent = cantidad
            
        }
        else {
            cantidad = 0;
            cantidadText.textContent = cantidad
        }
})


apiProductos = 'https://mytiendaa.herokuapp.com/productos';


document.addEventListener('DOMContentLoaded', () => {
    enviarData(apiProductos);
})

const enviarData = async (url) => {

    const resp = await fetch(url);
    const data = await resp.json();

    mostrarCards(data);

}

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

main.addEventListener('click', async (e) => {
    e.preventDefault();

    let btnDetalle = e.target.classList.contains('agregar');
    let id = e.target.id

    if (btnDetalle) {

        const resp = await fetch(apiProductos);
        const datos = await resp.json();

        const dato = datos.find(list => list.id == Number(id));

        let queHay = JSON.parse(localStorage.getItem('Detalle'));

        if (queHay !== null) {
            localStorage.setItem('Detalle', JSON.stringify(dato))
        }
        else {
            localStorage.setItem('Detalle', JSON.stringify(dato))
        }


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
                            <button class="btnPesoDecremento" id="btnDecremento"> - </button>
                                <input type="number" id="textCantidad" value="1" min="1">U</p> 
                            <button class="btnPesoIncremento" id="btnIncremento"> + </button>
                        </div>

                        <button id="agregarCarrito" class="agregarDetalle">Agregar</button>

                    </div>
                </div>

        `;



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
    /*let btnIncremento = e.target.classList.contains('btnPesoIncremento');
    let btnDecremento = e.target.classList.contains('btnPesoDecremento');*/

    if (btnAgregarCarrito) {

        let producto = JSON.parse(localStorage.getItem('Detalle'));
        alert('Su producto fue agregado al carrito con exito')

        let productoCarro = {
            nombre: producto.nombre,
            imagen: producto.imagen,
            precio: producto.precio,
            cantidad: producto.cantidad,
            id : producto.id

        }


        let KeyCarrito = JSON.parse(localStorage.getItem('Carrito'));

        if (KeyCarrito !== null) {
            KeyCarrito.unshift(productoCarro)
            localStorage.setItem('Carrito', JSON.stringify(KeyCarrito))

            cantidad = Number(cantidad) + Number(producto.cantidad)
            cantidadText.textContent = cantidad
            
        }
        else {
            carrito.unshift(productoCarro)
            localStorage.setItem('Carrito', JSON.stringify(carrito))

            cantidadText.textContent = producto.cantidad;
            cantidad = producto.cantidad

        }

    }

})


/*
divCanti.addEventListener('click', (e) => {

    let btnIncremento = e.target.classList.contains('btnPesoIncremento');
    let btnDecremento = e.target.classList.contains('btnPesoDecremento');


    if(btnIncremento){

        unidades = unidades + 1;
        
        console.log(a);
        
    }
    if(btnDecremento){

        unidades = unidades - 1;
        console.log(unidades);
    }
})*/





carritoBtn.addEventListener('click', (e) =>{
    mostrarContenidoCarro()
})



modalBodyCarrito.addEventListener('click', (e)=>{
    btnCarritoVacioAgregar = e.target.classList.contains('agregarDetalleVacio');
   

    ////---------------------(CRUD) ELIMINAR PRODUCTOS DEL CARRITO---------------------------------------------//

    let btnCarritoEliminar = e.target.classList.contains('btnPesoDecremento');
    let productoCarritoEliminar = JSON.parse(localStorage.getItem('Carrito'));

    if(btnCarritoEliminar){
        let id = e.target.id
        let filtro = productoCarritoEliminar.find(element => element.id == Number(id));

        console.log(filtro);

        productoCarritoEliminar.forEach((elemento, index) => {
            if (elemento.id === filtro.id) {
                productoCarritoEliminar.splice(index, 1)
                localStorage.setItem('Carrito', JSON.stringify(productoCarritoEliminar))

                mostrarContenidoCarro()

            
            }
        })
    }
    //-------------------------------------------------------------------------------------------------------//

    if(btnCarritoVacioAgregar){
        window.location.reload()
    }
})





//------------CRUD (CREAR) mostrar datos en el carrito------------------//

const mostrarContenidoCarro =() =>{

    //vuelve a revisar el carro
    let datosCarro = JSON.parse(localStorage.getItem('Carrito'));

    console.log(datosCarro)
    

    if (datosCarro !== null && datosCarro != '' ) {

        modalBodyCarrito.innerHTML = ''

        datosCarro.forEach(element => {

            const {nombre, precio, imagen, cantidad, id} = element;


            suma = Number(suma) + Number(precio);

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
                        <button class="btnPesoDecremento" id="${id}"> - </button>
                        <input type="number" id="textCantidad" value="1">U
                        <button class="btnPesoIncremento"> + </button>
                    </div>
                </div> <br>         
            `;
        })

            localStorage.setItem('Total', JSON.stringify(suma));
            

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
    }else {

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




btnCloseCarro.addEventListener('click', () => {
    window.location.reload()
})

