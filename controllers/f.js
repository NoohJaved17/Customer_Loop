// const Customer = require('../models/customerModel')
// const mongoose = require ('mongoose')
// const nodemailer = require("nodemailer");

// function generateOTP() {
//     const digits = "0123456789";
//     let OTP = "";
//     for (let i = 0; i < 6; i++) {
//       OTP += digits[Math.floor(Math.random() * 10)];
//     }
//     return OTP;
//   }

//   // Send OTP to user's email
// async function sendOTP(email) {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "s1@gmail.com",
//         pass: "s123456",
//       },
//     });

//     const OTP = generateOTP();
//   const mailOptions = {
//     from: "s1@gmail.com",
//     to: email,
//     subject: "OTP Verification",
//     text: `Your OTP for email verification is ${OTP}`,
//   };
//   await transporter.sendMail(mailOptions);

//   return OTP;
// }

// // Verify the entered OTP
// function verifyOTP(userOTP, OTP) {
//     return userOTP === OTP;
//   }

//   // Example usage
// async function authenticateEmail(email, userOTP) {
//     // Check if the email is valid
//     const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
//     if (!isValidEmail) {
//       throw new Error("Invalid email address");
//     }
  
//     // Send OTP to user's email
//     const OTP = await sendOTP(email);
// // Verify the entered OTP
// const isOTPValid = verifyOTP(userOTP, OTP);

// if (!isOTPValid) {
//   throw new Error("Invalid OTP");
// }

// // If everything is valid, return true
// return true;
// }  
  
// // get all customers
// const getAll = async (req, res) => {
//     const customers = await Customer.find({}).sort({createdAt: -1})

//     res.status(200).json(customers)
// }


// // get a single customer
// const getCustomer = async (req, res) => {
//     //getting id from params
//     const {id} = req.params

//     //if an invalid type of id (type does not match etc)
//     if(!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error : "No such customer exists!"})
//     }

//     const customer = await Customer.findById(id)

//     //if type ok but an invalid id
//     if(!customer) {
//         return res.status(404).json("No such customer exists!")
//     }
//     res.status(200).json(customer)
// }


// // add a new customer
// const register = async (req, res ) => {
//     //getting data from req
//     const {email, password, name} = req.body

//     if (email == "" || password == "" || name == "") { 
//         res.json({ status: "FAILED", message: "Empty input fields!", }) 

//     } else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) { 
//         res.json({status: "FAILED", message: "Invalid email entered", }); 

//     } else if (!/^[a-zA-Z ]*$/.test(name)) { 
//         res.json({ status: "FAILED", message: "Invalid name entered", });

//     } else if(password.length < 8) {
//         res.json({
//             status: "FAILED", message: "Password too short!", });
//     }
//     else {
//         Customer.find({email})
//         .then((result) => { 
//             if(result.length) {
//                 res.json({ status: "FAILED", message: "User with this email already exists!", });
//             }
//             else {
//                 try {
//                     const customer= Customer.create({email, password, name})
//                     //res.status(200).json(customer)
//                 } catch (error) {
//                     res.status(400).json({error: error.message})
//                 } 
//                 try {
//                     authenticateEmail(email, "123456");
//                     // Authentication successful
//                   } catch (error) {
//                     // Authentication failed
//                   }  
//             }

//         })
//     }
// }
// // try {
// //     const customer= Customer.create({email, password, name})
// //     res.status(200).json(customer)
// // } catch (error) {
// //     res.status(400).json({error: error.message})
// // }
// // }

// // delete a customer
// const deleteCustomer = async (req, res) => {
//     //getting id from params
//     const {id} = req.params

//     //if an invalid type of id
//     if(!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error : "No such customer exists!"})
//     }

//     const customer = await Customer.findOneAndDelete({_id: id})
//     //if no such customer exists!
//     if(!customer) {
//         return res.status(404).json("No such customer exists!")
//     }
//     res.status(200).json(customer)
// }


// // update  customer
// const updateCustomer = async (req, res)=> {
//     //getting id from params
//     const {id} = req.params

//     //if an invalid type of id
//     if(!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error : "No such customer exists!"})
//     }

//     const customer = await Customer.findOneAndUpdate({_id: id}, {
//         ...req.body
//     })

//     if(!customer) {
//         return res.status(404).json("No such customer exists!")
//     }
//     res.status(200).json(customer)
// }

// const loginCustomer = async (req, res) => {
//     const {email,password} =req.body;
//     const customer = await Customer.findOne({email: email})

//     if(customer) {
//         if(password===customer.password) {
//             res.status(200).json({message:"login sucess",customer:customer})
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
//     getAll,
//     getCustomer,
//     register,
//     deleteCustomer,
//     updateCustomer,
//     loginCustomer
// }

































// mongoose = require ('mnogoose');
// const Schema = mongoose.Schema;

// const otpVerificationSchema = new Schema ({
//     _customerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Customer' },
//     token: { type: String, required: true },
//     createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
//     // email: String,
//     // otp: String,
//     // createdAt: Date,
//     // expiresAt: Date
// })

// const otpVerification = mongoose.model(
//     "OTPVerification", otpVerificationSchema
// )

// module.exports = otpVerification









// //model
// const mongoose = require('mongoose');

// const Schema = mongoose.Schema

// const customerSchema = new Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     isVerified : {
//         type: Boolean,
//         default: false
//     }
// }, {timestamp: true})

// module.exports = mongoose.model('Customer', customerSchema)