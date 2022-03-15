
//pago
let productosPago = document.getElementById('productosPago')
let modalPagoFinal = document.getElementById('modalPagoFinal')

apiUsuarios = 'https://mytiendaa.herokuapp.com/usuarios';

document.addEventListener('DOMContentLoaded', () => {
    pago();
})

let traerProductosLocal =  JSON.parse(localStorage.getItem('Carrito'));

const pago = () =>{

     console.log(traerProductosLocal);
     productosPago.innerHTML = '';

     traerProductosLocal.forEach(element => {
         const { imagen, nombre, precio, cantidad} = element;
        
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
                    <button class="btnPesoDecremento" id=""> - </button>
                    <input type="number" id="textCantidad" value="1">U
                    <button class="btnPesoIncremento"> + </button>
                </div>
            </div>
        </div>     
         `;
     })
}

form.addEventListener('submit', (e)=>{
    e.preventDefault()

})

modalPagoFinal.addEventListener('click', (e)=>{
    e.preventDefault();

    if(btnSeguirComprando){

    window.location.href = "./index.html";

    localStorage.clear()
        
    }

})

    




