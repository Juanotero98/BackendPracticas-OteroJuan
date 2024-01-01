const mongoose = require('mongoose');

const cartscollection = 'Carritos'

const cartSchema = new mongoose.Schema({
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Productos' },
            quantity: { type: Number, default: 0 },
        },
    ],
});

const CartsModel = mongoose.model(cartscollection, cartSchema);

module.exports = CartsModel;
