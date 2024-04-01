import {ProductsCard} from '../ProductCart/ProductsCard'


const ProductsList = ([products]) => {
  return (
    <div>
        {products.map(product => <ProductsCard key={product._id} product={product}/>)}
    </div>
  )
}

export default ProductsList