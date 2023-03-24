const mongoose = require('mongoose');

const Schema = mongoose.Schema

const restOwnerSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    restLocation : {
        type: String,
        required: true
    },
    restName : {
        type: String,
        required: true
    }
}, {timestamp: true})

module.exports = mongoose.model('RestOwner', restOwnerSchema)