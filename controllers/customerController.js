const bcrypt = require("bcrypt");
const _ = require("lodash");
const axios = require("axios");
const otpGenerator = require('otp-generator');
const mongoose = require ('mongoose')

const Customer = require('../models/customerModel');
const  Otp = require('../models/otpModel');

// // get all customers
const getAll = async (req, res) => {
    const customers = await Customer.find({}).sort({createdAt: -1})

    res.status(200).json(customers)
}


// get a single customer
const getCustomer = async (req, res) => {
    //getting id from params
    const {id} = req.params

    //if an invalid type of id (type does not match etc)
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : "No such customer exists!"})
    }

    const customer = await Customer.findById(id)

    //if type ok but an invalid id
    if(!customer) {
        return res.status(404).json("No such customer exists!")
    }
    res.status(200).json(customer)
}

//register a new customer
const signUp = async (req, res) => {
    const {email, password, name} = req.body

    if (email == "" || password == "" || name == "") { 
        res.json({ status: "FAILED", message: "Empty input fields!", }) 

    } else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) { 
        res.json({status: "FAILED", message: "Invalid email entered", }); 

    } else if (!/^[a-zA-Z ]*$/.test(name)) { 
        res.json({ status: "FAILED", message: "Invalid name entered", });

    } else if(password.length < 8) {
        res.json({
            status: "FAILED", message: "Password too short!", });
    }

    else {
        const customer = await Customer.findOne({email: email})

        if (customer) return res.status(400).send("Customer already registered!");
        else {
            try {
                const customer= Customer.create({email, password, name})
                //res.status(200).json(customer)
            } catch (error) {
                res.status(400).json({error: error.message})
            } 
        }
        const OTP = otpGenerator.generate(6, {
            digits: true, alphabets: false, upperCase: false, specialChars: false
        });
        console.log(OTP);
        const greenwebsms = new URLSearchParams();
        greenwebsms.append('token', '05fa33c4cb50c35f4a258e85ccf50509');
        greenwebsms.append('to', '+${email}');
        greenwebsms.append('message', 'Verification Code ${OTP}');
        await axios.post('http://api.greenweb.com.bd/api.php', greenwebsms)
        const otp = await Otp({ 
            email: email, 
            password: password,
            name: name,
            otp: OTP 
        });
        await otp.save();
    res.status(200).send({message:"Otp send successfully!",otp});
    }
}

const verifyOtp = async (req, res) => {
    
    const otpHolder = await Otp.find({
        email: req.body.email
    });
    // console.log(otpHolder[0].otp);
    // console.log(req.body.otp);

    if (otpHolder[0].otp !== req.body.otp){
        console.log("hello");
    }
    
    if (otpHolder[0].otp !== req.body.otp) return res.status(400).send("Enter Correct OTP!");
    
    const rightOtpFind = otpHolder[otpHolder.length - 1];
    // const validCustomer = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

    // if (rightOtpFind.number === req.body.number && validCustomer) {
        if (rightOtpFind.email === req.body.email) {
        const customer = new Customer(_.pick(req.body, ["email"]));
        const token = customer.generateJWT();
        const result = await customer.save();
        const OTPDelete = await Otp.deleteMany({
            number: rightOtpFind.number
        });
        return res.status(200).send({
            message: "Customer Registration Successfull!",
            token: token,
            data: result
        });
    } else {
        return res.status(400).send("Your OTP was wrong!")
    }
}

// delete a customer
const deleteCustomer = async (req, res) => {
    //getting id from params
    const {id} = req.params

    //if an invalid type of id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : "No such customer exists!"})
    }

    const customer = await Customer.findOneAndDelete({_id: id})
    //if no such customer exists!
    if(!customer) {
        return res.status(404).json("No such customer exists!")
    }
    res.status(200).json(customer)
}

// update  customer
const updateCustomer = async (req, res)=> {
    //getting id from params
    const {id} = req.params

    //if an invalid type of id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : "No such customer exists!"})
    }

    const customer = await Customer.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!customer) {
        return res.status(404).json("No such customer exists!")
    }
    res.status(200).json(customer)
}


//login
const login = async (req, res) => {
    const {email,password} =req.body;
    const customer = await Customer.findOne({email: email})

    if(customer) {
        if(password===customer.password) {
            res.status(200).json({message:"login sucess",customer:customer})
        }
        else {
            res.status(404).json("Wrong credentials")
        }
    }
    else {
        res.status(400).json("not registered!")
    }   
}

module.exports = {
    getAll,
    getCustomer,
    signUp,
    verifyOtp,
    deleteCustomer,
    updateCustomer,
    login
}