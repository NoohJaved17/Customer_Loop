const mongoose = require('mongoose');

const Schema = mongoose.Schema

const restaurantSchema = new Schema({
    ownerEmail: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    location : {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {timestamp: true})

module.exports = mongoose.model('Restaurant', restaurantSchema)