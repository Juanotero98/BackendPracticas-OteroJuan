const { Router } = require("express");
const ProductManager = require("../dao/File/managers/productManager");
const ProductDaoMongo = require("../dao/Mongo/productDaoMongo");


const router = Router();
//const productService = new ProductManager("./src/mockDB/productos.json");
const productService = new ProductDaoMongo ()

router
  .get("/", async (req, res) => {
    const products = await productService.getProducts();
    res.send({
      status: "success",
      payload: products,
    });
  })

  .get("/:pid", async (req, res) => {
    const { pid } = req.params;
    const product = await productService.getProduct(parseInt(pid));
    if (!product) {
      return res.status(400).send({
        status: "Error",
        mensaje: "No se encuentra el producto",
      });
    }
    res.send({
      status: "success",
      payload: product,
    });
  })

  .post("/", async (req, res) => {
    const productData = req.body;

    try {
      const newProduct = await productService.addProduct(productData);
      res.status(201).send({
        status: "success",
        payload: newProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: "error",
        mensaje: "Error al agregar el producto",
      });
    }
  })

  .put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const updatedFields = req.body;

    try {
      const updatedProduct = await productService.updateProduct(
        parseInt(pid),
        updatedFields
      );

      if (!updatedProduct) {
        return res.status(404).send({
          status: "Error",
          mensaje: "No se encuentra el producto para actualizar",
        });
      }
      res.send({
        status: "success",
        payload: updatedProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: "error",
        mensaje: "Error al actualizar el producto",
      });
    }
  })

  .delete("/:pid", async (req, res) => {
    const { pid } = req.params;

    try {
      const deletedProduct = await productService.deleteProduct(parseInt(pid));

      if (!deletedProduct) {
        return res.status(404).send({
          status: "Error",
          mensaje: "No se encuentra el producto para eliminar",
        });
      }

      res.send({
        status: "success",
        payload: deletedProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: "error",
        mensaje: "Error al eliminar el producto",
      });
    }
  });

module.exports = router;
