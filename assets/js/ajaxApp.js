// OBJETOS

class Product{

    constructor(name, price, year){
        this.name = name
        this.price = price
        this.year = year
    }
}

class UI {
    addProduct(product){

        const productList = document.getElementById('product-list')
        const element = document.createElement('div')

        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong><u>Nombre del producto</u></strong>: ${product.name}
                    <strong><u>Precio del producto</u></strong>: ${product.price}
                    <strong><u>Año del producto</u></strong>: ${product.year}
                    <button name="delete" class="btn btn-danger ms-5" >Eliminar</button>
                </div>
            </div>
        `

        productList.appendChild(element)
    }

    resetForm(){
        document.getElementById('product-form').reset()
    }

    deleteProduct(element){
        if(element.name === 'delete'){
            console.log(element.parentElement.parentElement.parentElement.remove())

            this.showMessage('PRODUCTO ELIMINADO SATISFACTORIAMENTE','info')
        }
        
    }

    showMessage(message, cssClass){
        const div = document.createElement('div')

        div.className = `card-footer bg-${cssClass} text-center`
        div.appendChild(document.createTextNode(message))

        const card = document.querySelector('#Card')

        card.appendChild(div)

        setTimeout(function(){
            document.querySelector('.card-footer').remove()
        }, 3000)
    }
}

//DOM events

let productForm = document.querySelector('form')
let btnForm = document.querySelector('.btn-primary')

btnForm.addEventListener('click', function(e){

        e.preventDefault()

        const nameProduct = document.getElementById("name").value
        const priceProduct = document.getElementById("price").value
        const yearProduct = document.getElementById("year").value

        const product = new Product(nameProduct, priceProduct, yearProduct)
        const ui = new UI()

        if(nameProduct === '' || priceProduct === '' || yearProduct === '')
            return ui.showMessage('COMPLETE LOS CAMPOS', 'danger')
        
        ui.addProduct(product)
        ui.showMessage('PRODUCTO AGREGADO SATISFACTORIAMENTE', 'success')
        console.log('producto agregado')

        ui.resetForm()
})

let productList = document.getElementById("product-list")

productList.addEventListener('click', (e) => {
    
    const ui = new UI();

    ui.deleteProduct(e.target)

})

// <!--==================== CONFIRMACION FUNCIONALIDAD ARCHIVO ====================--> //
console.log("Archivo Ajax Productos Cargado Correctamente");


// <!--==================== CARGAR DATOS DE PRODUCTOS REGISTRADOS ====================--> //

function cargarDatos(){
    const xhttp = new XMLHttpRequest()

    xhttp.open('GET','http://127.0.0.1:5500/assets/js/db.json')
    xhttp.send()
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            
            const productList = document.getElementById('product-list')
            let datos = JSON.parse(this.responseText)

            for(let x of datos['productos']){

                const element = document.createElement('div')

                let nombre = x.name
                let precio = x.price
                let year = x.year
                

                element.innerHTML += `
                    <div class="card text-center mb-4">
                        <div class="card-body">
                            <strong><u>Nombre del producto</u></strong>: ${nombre}
                            <strong><u>Precio del producto</u></strong>: ${precio}
                            <strong><u>Año del producto</u></strong>: ${year}
                            <button name="delete" class="btn btn-danger ms-5" >Eliminar</button>
                        </div>
                    </div>
                `
                productList.appendChild(element)
            }
        }
    }
}

cargarDatos()