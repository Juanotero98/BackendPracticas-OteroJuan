/*const express = require('express');
const ProductManager = require('./index'); 

const app = express();
const port = 8080;

const manager = new ProductManager('productos.json');


app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await manager.getProducts();

        if (limit) {
            const limitedProducts = products.slice(0, parseInt(limit, 10));
            res.json(limitedProducts);
        } else {
            res.json(products);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid, 10);
        const product = await manager.getProductById(productId);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(port, () => {
    console.log(`Servidor Express iniciado en http://localhost:${port}`);
});*/