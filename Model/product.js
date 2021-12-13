const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    product_title: {
        type: String,
        required: true
    },
    product_model : {
        type: String,
        required: true
    },
    product_category: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    product_count : {
        type: Number,
        required: true
    }
}, {collection: 'product'})

const model = mongoose.model('product', productSchema);
module.exports = model