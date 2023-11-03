class ProductManager{
    constructor(){
        this.products=[]
        this.nextId= 1
    }

    addProduct(productData){
        if(
            !productData.title ||
            !productData.description ||
            !productData.price ||
            !productData.thumbnail ||
            !productData.code ||
            !productData.stock ||
            this.products.some((product)=> product.code === productData.code)
        ) {
            return "Error: Datos Invalidos"
        }

        const product ={
            id:this.nextId,
            ...productData
        }

        this.products.push(product);
        this.nextId++

        return "Producto Agregado"
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        const product = this.products.find((product)=> product.id === id)
        if(!product){
            return "Error: Not Found"
        }

        return product
    }

}

const manager = new ProductManager()

console.log(manager.addProduct({
    title: "Coca Cola",
    description: "Gaseosa de color oscuro que viene en botella de plastico con un etiqueta roja ",
    price: 750,
    thumbnail: "thumbnail 1.jpg",
    code: "P1",
    stock: 30,
}))

console.log(manager.addProduct({
    title: "Cafe",
    description: "Granos molidos de color oscure que vienen en paquetes de plastico",
    price: 525,
    thumbnail: "thumbnail 3.jpg",
    code: "P2",
    stock: 75,
}))

//ESTE EJEMPLO DEBEREIA DAR "ERROR DATOS INVALIDOS" DEBIDO A QUE SE REPITEN VARIOS DATOS//
console.log(manager.addProduct({
    title: "Coca Cola",
    description: "Gaseosa de color oscuro que viene en botella de plastico con un etiqueta roja ",
    price: 750,
    thumbnail: "thumnail 1.jpg",
    code: "P1",
    stock: 30,
}))

console.log(manager.getProducts())
console.log(manager.getProductById(2))
console.log(manager.getProductById(4))
