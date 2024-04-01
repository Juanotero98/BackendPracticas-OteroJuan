const ProductManager = require("../dao/File/managers/productManager");
const ProductDaoMongo = require("../dao/Mongo/productDaoMongo");

class ProductController {
    contructor(){
        this.productsService = new ProductDaoMongo()
        //this.productsService = new ProductManager()
        this.getProducts = this.getProducts.bind(this)
    }

     getProducts = async (req, res) =>{
        const products = await this.productService.get();
        res.send({
          status: "success",
          payload: products,
        });
      }

     getProduct = async (req, res) => {
        const { pid } = req.params;
        const product = await this.productService.getProduct({_id: pid});
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
      }

     createProduct = async (req, res) => {
        const productData = req.body;
    
        try {
          const newProduct = await this.productService.create(productData);
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
      }

     updateProduct = async (req, res) => {
        const { pid } = req.params;
        const updatedFields = req.body;
    
        try {
          const updatedProduct = await this.productService.update(
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
      }

     deleteProduct = async (req, res) => {
        const { pid } = req.params;
    
        try {
          const deletedProduct = await this.productService.delete(parseInt(pid));
    
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
      }

}

module.exports = ProductController