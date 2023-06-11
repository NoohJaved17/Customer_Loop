const bcrypt = require("bcrypt");
const _ = require("lodash");
const axios = require("axios");
const otpGenerator = require('otp-generator');
const mongoose = require ('mongoose')

const RestOwner = require('../models/restOwnerModel');
const  Otp = require('../models/otpModel');

// // get all restaurant owners
const getAll = async (req, res) => {
    const restOwner = await RestOwner.find({}).sort({createdAt: -1})

    res.status(200).json(restOwner)
}


// get a single restaurant owner
const getRestOwner = async (req, res) => {
    //getting id from params
    const {id} = req.params

    //if an invalid type of id (type does not match etc)
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : "No such restaurant owner exists!"})
    }

    const restOwner = await RestOwner.findById(id)

    //if type ok but an invalid id
    if(!restOwner) {
        return res.status(404).json("No such restaurant owner exists!")
    }
    res.status(200).json(restOwner)
}

//register a new restOwner
const signUp = async (req, res) => {
    const {email, password, name, restLocation, restName} = req.body

    if (email == "" || password == "" || name == "" || restLocation == "" || restName == "") { 
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
        const restOwner = await RestOwner.findOne({email: email})

        if (restOwner) return res.status(400).send("Restaurant owner already registered!");
        else {
            try {
                const restOwner= RestOwner.create({email, password, name, restLocation, restName})
            } catch (error) {
                res.status(400).json({error: error.message})
            } 
        }
    //     const OTP = otpGenerator.generate(6, {
    //         digits: true, alphabets: false, upperCase: false, specialChars: false
    //     });
    //     console.log(OTP);
    //     const greenwebsms = new URLSearchParams();
    //     greenwebsms.append('token', '05fa33c4cb50c35f4a258e85ccf50509');
    //     greenwebsms.append('to', '+${email}');
    //     greenwebsms.append('message', 'Verification Code ${OTP}');
    //     await axios.post('http://api.greenweb.com.bd/api.php', greenwebsms)
    //     const otp = await Otp({ 
    //         email: email, 
    //         password: password,
    //         name: name,
    //         otp: OTP 
    //     });
    //     await otp.save();
    // res.status(200).send({message:"Otp send successfully!",otp});
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
    // const validRestOwner = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

    // if (rightOtpFind.number === req.body.number && validRestOwner) {
        if (rightOtpFind.email === req.body.email) {
        const restOwner = new RestOwner(_.pick(req.body, ["email"]));
        const token = restOwner.generateJWT();
        const result = await restOwner.save();
        const OTPDelete = await Otp.deleteMany({
            number: rightOtpFind.number
        });
        return res.status(200).send({
            message: "Restaurant owner Registration Successfull!",
            token: token,
            data: result
        });
    } else {
        return res.status(400).send("Your OTP was wrong!")
    }
}

// delete a restOwner
const deleteRestOwner = async (req, res) => {
    //getting id from params
    const {id} = req.params

    //if an invalid type of id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : "No such restaurant owner exists!"})
    }

    const restOwner = await RestOwner.findOneAndDelete({_id: id})
    //if no such customer exists!
    if(!customer) {
        return res.status(404).json("No such restaurant owner exists!")
    }
    res.status(200).json(restOwner)
}

// update  restOwner
const updateRestOwner = async (req, res)=> {
    //getting id from params
    const {id} = req.params

    //if an invalid type of id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : "No such restaurant owner exists!"})
    }

    const restOwner = await RestOwner.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!restOwner) {
        return res.status(404).json("No such restaurant owner exists!")
    }
    res.status(200).json(restOwner)
}


//login
const login = async (req, res) => {
    const {email,password} =req.body;
    const restOwner = await RestOwner.findOne({email: email})

    if(restOwner && restOwner.isVerified === true) {
            if(password===restOwner.password) {
                res.status(200).json({message:"login sucess",restOwner:restOwner})
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
    getRestOwner,
    signUp,
    verifyOtp,
    deleteRestOwner,
    updateRestOwner,
    login
}











































// const RestOwner = require('../models/restOwnerModel')
// const mongoose = require ('mongoose')

// //get All
// const getAllRestOwners = async (req, res) => {
//     const restOwners = await RestOwner.find({}).sort({createdAt: -1})

//     res.status(200).json(restOwners)
// }


// //get a single restaurant owner
// const getRestOwner = async (req, res) => {
//     //getting id from params
//     const {id} = req.params

//     //if an invalid type of id (type does not match etc)
//     if(!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error : "No such restaurant owner exists!"})
//     }

//     const restOwner = await RestOwner.findById(id)

//     //if type ok but an invalid id
//     if(!restOwner) {
//         return res.status(404).json("No such restaurant owner exists!")
//     }
//     res.status(200).json(restOwner)
// }

// // add a new restOwner
// const register = async (req, res ) => {
//     //getting data from req
//     const {email, password, name, restLocation, restName} = req.body

//     //add a new customer to db
//     try {
//         const restOwner= await RestOwner.create({email, password, name, restLocation, restName})
//         res.status(200).json(restOwner)
//     } catch (error) {
//         res.status(400).json({error: error.message})

//     }
// }


// //delete a restaurant Owner
// const deleteRestOwner = async (req, res) => {
//     //getting id from params
//     const {id} = req.params

//     //if an invalid type of id
//     if(!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error : "No such restaurant owner exists!"})
//     }

//     const restOwner = await RestOwner.findOneAndDelete({_id: id})
//     //if no such customer exists!
//     if(!restOwner) {
//         return res.status(404).json("No such restaurant owner exists!")
//     }
//     res.status(200).json(restOwner)
// }


// // update restaurant owner's details
// const updateRestOwner = async (req, res)=> {
//     //getting id from params
//     const {id} = req.params

//     //if an invalid type of id
//     if(!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error : "No such restaurant owner exists!"})
//     }

//     const restOwner = await RestOwner.findOneAndUpdate({_id: id}, {
//         ...req.body
//     })

//     if(!restOwner) {
//         return res.status(404).json("No such restaurant owner exists!")
//     }
//     res.status(200).json(restOwner)
// }

// const login = async (req, res) => {
//     const {email,password} =req.body;
//     const restOwner = await RestOwner.findOne({email: email})

//     if(customer) {
//         if(password===restOwner.password) {
//             res.status(200).json({message:"login sucess",restOwner:restOwner})
//         }
//         else {
//             res.status(404).json("Wrong credentials")
//         }
//     }
//     else {
//         res.status(400).json("not registered!")
//     }
    
// }


// module.exports = {
//     getAllRestOwners,
//     getRestOwner,
//     register,
//     deleteRestOwner,
//     updateRestOwner,
//     login
// }