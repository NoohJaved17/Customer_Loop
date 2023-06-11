const bcrypt = require("bcrypt");
const _ = require("lodash");
const axios = require("axios");
const otpGenerator = require('otp-generator');
const mongoose = require ('mongoose')

const Feedback = require('../models/feedbackModel');

// // get all feedbacks
const getAll = async (req, res) => {
    const feedbacks = await Feedback.find({}).sort({createdAt: -1})

    res.status(200).json(feedbacks)
}


// get a single feedback
const getOne = async (req, res) => {
    //getting id from params
    const {orderID} = req.params


    const feedback = await Feedback.findById(orderID)

    //if type ok but an invalid id
    if(!feedback) {
        return res.status(404).json("No such feedback to be given exists!")
    }
    res.status(200).json(feedback)
}

const addFeedback = async (req, res) => {
    const {orderID} = req.body

    if (orderID == "") { 
        res.json({ status: "FAILED", message: "Empty input fields!", }) 
    }
    else {
        const feedback = await Feedback.findOne({orderID: orderID})
        if (feedback) return res.status(400).send("Entry already exists!!");
        else {
            try {
                const feedback= Feedback.create({orderID})
            } catch (error) {
                res.status(400).json({error: error.message})
            } 
        }
    }
}

module.exports = {
    getAll,
    getOne,
    addFeedback
}