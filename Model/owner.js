const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{collection: 'owner'});
const model = mongoose.model('owner', ownerSchema);
module.exports = model;