const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const customers = require('../../Model/customer');
const orders = require('../../Model/order');
const products = require('../../Model/product');

router.post('/register', async (req, res) => {
    const {
        name,
        email,
        password:plaintext, 
        address
    } = req.body;
    const role = "teacher";
    if(!name || typeof name != 'string'){
        return res.json({status: 'error', msg: 'Invalid Name'})
    }
    if(!plaintext || typeof plaintext != 'string'){
        return res.json({status: 'error', msg: 'Invalid password'})
    }
    if(plaintext.length < 6){
        return res.json({status: 'error', msg: 'Password should greater than 6 character'})
    }
    const password = await bcrypt.hash(plaintext, 10);
    try{
        const newCustomer = await customers.create({
            name,
            email,
            password,
            address
        })
        res.send("Registration successfully")
    } catch(err){
        throw err;
    }
})

router.post('/sign_in', async (req, res) => {
    const {email, password} = req.body;
    const getCustomer = await customers.findOne({email}).lean();
    if(!getCustomer){
        res.json({status: 'ok', msg: 'Email not found!!!'})
    }
    if(await bcrypt.compare(password, getCustomer.password)){
        
        return res.json({status: 'ok', data: "Signed in"})
    }
    else{
        return res.json({status: 'ok', msg: 'Incorrect email or password!!!'})
    }
})

router.get('/browse_products', async (req, res) => {
    const getProducts = await products.find({}).lean()
    res.send(getProducts)
})

// placing order

router.post('/:customer_id/product/:product_id/add_order', async (req, res) => {
    const {
        order_date,
        order_count,
        payment_type,
    } = req.body;
    const {customer_id,product_id} = req.params;

    const getCustomer = await customers.findOne({'_id': customer_id})

    
    const getProduct = await products.findOne({'_id': product_id})

    const {name: customer_name, email: customer_email, address: customer_address} = getCustomer;
    const customer_info = {
        customer_id,
        customer_name,
        customer_email,
        customer_address
    }
   const {product_title, product_model, product_category, product_description, product_price, product_count} = getProduct;
    const product_info = {
        product_id,
        product_title,
        product_model,
        product_category,
        product_description,
        product_price
    }
    update_count = product_count - order_count;
    total_price = product_price * order_count
    if(order_count > product_count){
        return res.status(200).json({msg: `Please reduce the product quantity.`})
    }
    else{
        try{
            const addOrder = await orders.create({
                order_date,
                order_count,
                payment_type,
                total_price,
                customer_info,
                product_info
            })
            const updateProduct = await products.updateOne(
                {'_id': product_id},
                {
                    "$set" : {
                        "product_count" : update_count
                    }
                }
            )
            res.send(`${customer_name} ordered ${product_title}`);
        }catch(err){
            throw err;
        }
    }
})

// view orders

router.get('/:customer_id/view_orders', async (req, res) => {
    const {customer_id} = req.params;

    const getOrders = await orders.find({'customer_id': customer_id}).lean()

    console.log(getOrders)
    res.send(getOrders)

})

module.exports = router;
