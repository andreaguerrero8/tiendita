//pago
let productosPago = document.getElementById('productosPago')
let modalPagoFinal = document.getElementById('modalPagoFinal')
let btnPagoFinal = document.getElementById('btnPagoFinal')

let correo = document.getElementById('correo')
let numero = document.getElementById('numero')
let dato1 = document.getElementById('dato1')
let dato2 = document.getElementById('dato2')
let nombre = document.getElementById('nombre')


let form =  document.getElementById('form')

apiUsuarios = 'https://mytiendaa.herokuapp.com/usuarios';


document.addEventListener('DOMContentLoaded', (e) => {
    pago();
    plata();

})

const plata = () => {
    let suma = 0;
    let traerProductosLocal = JSON.parse(localStorage.getItem('Carrito'));

    traerProductosLocal.forEach(element => {
        suma = suma + element.subtotal
    })


    btnPagoFinal.textContent = `Pagar $ ${(suma).toFixed(2)}`
}


const pago = () => {
    let traerProductosLocal = JSON.parse(localStorage.getItem('Carrito'));
    productosPago.innerHTML = '';

    traerProductosLocal.forEach(element => {
        const { imagen, nombre, precio, cantidad, id } = element;

        productosPago.innerHTML += `
         
         <div class="modal-body" id="modal-body-carrito">
            <div class="modalito">
                <div>
                    <img src="${imagen}">
                </div>
                
                <div class="textModal">
                    <p>${nombre}</p>
                    <strong><p>$${precio}</p></strong>
                </div>

                <div class="pesoCarFinal"> 
                    <button class="btnPesoDecremento" id="${id}"> - </button>
                    <p id="textCantidad">${cantidad}U</p>
                    <button class="btnPesoIncremento" id="${id}s"> + </button>
                </div>
            </div>
        </div>     
         `;

    })

}



productosPago.addEventListener('click', (e) => {
    ////---------------------(CRUD) ELIMINAR PRODUCTOS DEL CARRITO---------------------------------------------//

    let btnCarritoEliminar = e.target.classList.contains('btnPesoDecremento');
    let btnCarritoAgregar = e.target.classList.contains('btnPesoIncremento');
    let productoCarritoEliminar = JSON.parse(localStorage.getItem('Carrito'));

    if (btnCarritoEliminar) {
        let id = e.target.id
        let filtro = productoCarritoEliminar.find(element => element.id == Number(id));

        productoCarritoEliminar.forEach((elemento, index) => {

            if (elemento.id === filtro.id) {// estoy en el producto a modificar

                if (elemento.cantidad == '1') {
                    productoCarritoEliminar.splice(index, 1)
                    localStorage.setItem('Carrito', JSON.stringify(productoCarritoEliminar))

                    plata()
                    pago()

                } else {

                    let MenosUno = (Number(elemento.cantidad) - 1)
                    let MenosSubtotal = (Number(elemento.subtotal) - Number(elemento.precio))
                    filtro.cantidad = MenosUno;
                    filtro.subtotal = MenosSubtotal

                    console.log(filtro);

                    productoCarritoEliminar.splice(index, 1, filtro)
                    localStorage.setItem('Carrito', JSON.stringify(productoCarritoEliminar))


                    plata()
                    pago()


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

                    plata()
                    pago()

                }

            })
        }
    }
})


form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (correo == '' || nombre == '' || dato1 == '' || dato2 == '' || numero == '') {

        alert('DEBES LLENAR TODOS LOS CAMPOS DEL FORMULARIO')
    }

})

modalPagoFinal.addEventListener('click', (e) => {
    e.preventDefault();
    let btnSeguirComprando = e.target.classList.contains('btnAgregarMásFinal')

    if (btnSeguirComprando) {

        window.location.href = "./index.html";
        localStorage.clear()

    }

})




