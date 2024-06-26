import { Link } from "react-router-dom";


export  function ProductsCart([product]) {
  return (
    <div className="card w-25 m-3">

      <div className="card-body">
        <img src={product.thumbnail} className='card-img.top' alt="Imagen"/>
        <h3>{product.title}</h3>
        <h3>{product.description}</h3>
        <h3>Stock: {product.tock}</h3>
        <h3>Price: {product.price}</h3>
      </div>
      <div className="card-footer">
        <Link to={`/detalle/${product._id}`} className="btn btn-outline-dark w-100">Detalle</Link>
      </div>

    </div>
  )
}
