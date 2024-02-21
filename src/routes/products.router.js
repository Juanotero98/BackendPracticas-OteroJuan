const { Router } = require("express");
const ProductManager = require("../dao/File/managers/productManager");
const ProductController = require("../controllers/products.controller");



const router = Router();
const productsController = new ProductController
//const productService = new ProductManager("./src/mockDB/productos.json");


router
  .get("/",productsController.getProducts )

  .get("/:pid",productsController.getProduct)

  .post("/",productsController.createProduct )

  .put("/:pid",productsController.updateProduct)

  .delete("/:pid",productsController.deleteProduct);

module.exports = router;
