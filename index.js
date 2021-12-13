const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const ownerRoutes = require('./Routes/Owner/owner');
const customerRoutes = require('./Routes/Customer/customer');

require('dotenv').config();

const PORT = 5000;

app.use(bodyParser.json())

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fwn1v.mongodb.net/infoware?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Connected")
    console.log(mongoose.connection.readyState)
});

app.use('/owner', ownerRoutes);
app.use('/customer', customerRoutes)

app.listen(PORT, () => {
    console.log("Server is running on port 5000");
})