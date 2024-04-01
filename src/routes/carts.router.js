const { Router } = require("express");
const cartManager = require("../dao/File/managers/cartManager");
const { CartsModel } = require("../dao/Mongo/models/carts.models");
const cartsService = new cartManager();
const router = Router();



router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartsModel.getCartById(parseInt(cid));
    res.send({
      status: "success",
      payload: cart,
    });
  } catch (error) {
    console.log("error");
    res.status(500).send({
        status: "error",
        mensaje: "Error al obtener carrito"
    })
  }
});

router.post('/', async(req, res)=>{
    try {
        const newCart = await CartsModel.createCart()
        res.status(201).send({
            status: 'success',
            payload: newCart
        })
    } catch (error) {
        console.log("error")
        res.status(500).send({
            status: "error",
            mensaje: "Error al crear carrito"
        })
    }
})

router.post('/:cid/product/:pid', async (req, res)=>{
    try {
        const {cid, pid} = req.params
        const {quantity} = req.body

        const updatedCart = await CartsModel.addProductToCart(parseInt(cid), parseInt(pid), quantity)

        res.send({
            status: "success",
            payload: updatedCart
        })
    } catch (error) {
        console.log("error")
        res.status(500).send({
            status: "Error",
            mensaje: "Error al agregar el producto al carrito"
        })
    }
})

module.exports = router;
