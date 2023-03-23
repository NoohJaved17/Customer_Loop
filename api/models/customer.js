const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    title: {
        type: "String",
        required: true,
    },
    description: {
        type: "String",
    },
});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;