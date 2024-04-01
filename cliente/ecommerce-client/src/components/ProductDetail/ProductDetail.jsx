

function ProductDetail([product]) {
  return (
    <div>
        <h1>{product.title}</h1>
        <h2>{product.description}</h2>
        <h2>Stock: {product.stock}</h2>
        <h2>Precio: {product.price}</h2>
    </div>
  )
}

export default ProductDetail