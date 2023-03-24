const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const customerSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isVerified : {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

customerSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id: this._id,
        email: this.email,
        password: this.password,
        name: this.name
    }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
    return token
}

module.exports = model('Customer', customerSchema);
