const Customer = require("../models/Customer");

exports.getAllCustomer = (req, res) => {
    Customer.find()
        .then((Customer) => res.json(Customer))
        .catch((err) =>
            res
                .status(404)
                .json({ message: "Customer not found", error: err.message })
        );
};

exports.postCreateCustomer = (req, res) => {
    Customer.create(req.body)
        .then((data) => res.json({ message: "Customer added successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to add Customer", error: err.message })
        );
};

exports.putUpdateCustomer = (req, res) => {
    Customer.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => res.json({ message: "updated successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to update Customer", error: err.message })
        );
};

exports.deleteCustomer = (req, res) => {
    Customer.findByIdAndRemove(req.params.id, req.body)
        .then((data) =>
            res.json({ message: "Customer deleted successfully", data })
        )
        .catch((err) =>
            res
                .status(404)
                .json({ message: "book not found", error: err.message })
        );
};