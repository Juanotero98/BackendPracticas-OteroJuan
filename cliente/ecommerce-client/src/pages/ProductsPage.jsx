import { useEffect, useState } from "react"
import ProductsList from "../components/ProductsList/ProductsList"


export const ProductsPage = () => {
    //MANEJO DE ESTADO O LLAMADAS A APIS//
    const [products, setProducts] = useState([])// VARIABLE TIPO CONSTANTE PERO QUE TIENE CONSISTENCIA

    useEffect(()=>{
        const getProducts = async () =>{
            const dataJson = await fetch('http://localhost:8080/api/products')
            const data = await dataJson.json()
            setProducts(data.payload) 
        }
        getProducts()
    }, [])
  return (
    <div>
        <ProductsList products={products}/>
    </div>
  )
}

