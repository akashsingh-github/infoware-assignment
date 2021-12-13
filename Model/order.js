const mongoose = require('mongoose');

const orderCustomerSchema = mongoose.Schema({
    customer_id:{
        type: String,
        required: true
    },
    customer_name:{
        type: String,
        required: true
    },
    customer_email: {
        type: String,
        required: true
    },
    customer_address: {
        type: String,
        required: true
    }
})

const orderProductSchema = mongoose.Schema({
    product_id:{
        type: String,
        required: true
    },
    product_title: {
        type: String,
        required: true
    },
    product_model: {
        type: String,
        required: true
    },
    product_description:{
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    }
})

const orderSchema = mongoose.Schema({
    order_date: {
        type: String,
        required: true
    },
    order_count: {
        type: String,
        required: true
    },
    payment_type: {
        type: String,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    customer_info: orderCustomerSchema,
    product_info: orderProductSchema
}, {collection: 'order'})

const model = mongoose.model('order', orderSchema);
module.exports = model