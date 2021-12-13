const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const owners = require('../../Model/owner');
const products = require('../../Model/product');
const orders = require('../../Model/order');

router.post('/register', async (req, res) => {
    const {
        name,
        email,
        password:plaintext, 
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
        const newOwner = await owners.create({
            name,
            email,
            password
        })
        res.send("Registration successfully")
    } catch(err){
        throw err;
    }
})


// adding product

router.post('/add_product', async (req, res) => {
    const {product_title,product_model,product_category ,product_description,product_price,product_count} = req.body;

    try{
        const addProduct = await products.create({
            product_title,
            product_model,
            product_category,
            product_description,
            product_price,
            product_count
        })
        res.send("New product added successfully!!");
    }catch(err){
        throw err;
    }   
})

// view orders

router.get('/view_orders', async (req, res) => {
    const getOrders = await orders.find({}).lean()
    res.send(getOrders);
})

module.exports = router;