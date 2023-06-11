const { Schema, model } = require('mongoose');

const feedbackSchema = Schema({
    orderID: {
        type: String,
        required: true
    },
    given : {
        type: Boolean,
        default: false
    }
}, { timestamps: true });



module.exports = model('Feedback', feedbackSchema);
