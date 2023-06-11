const Restaurant = require('../models/restaurantModel')
const mongoose = require ('mongoose')

//get All
const getAll = async (req, res) => {
    const restaurants = await Restaurant.find({}).sort({createdAt: -1})

    res.status(200).json(restaurants)
}


//get a single restaurant
const getRestaurant = async (req, res) => {
    //getting id from params
    const {id} = req.params

    //if an invalid type of id (type does not match etc)
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : "No such restaurant exists!"})
    }

    const restaurant = await Restaurant.findById(id)

    //if type ok but an invalid id
    if(!restaurant) {
        return res.status(404).json("No such restaurant exists!")
    }
    res.status(200).json(restaurant)
}

// add a new restaurant
const register = async (req, res ) => {
    const {ownerEmail, password, ownerName, location, name} = req.body

    if (ownerEmail == "" || password == "" || ownerName == "" || location == "" || name == "") { 
        res.json({ status: "FAILED", message: "Empty input fields!", }) 

    } else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(ownerEmail)) { 
        res.json({status: "FAILED", message: "Invalid email entered", }); 

    } else if (!/^[a-zA-Z ]*$/.test(ownerName)) { 
        res.json({ status: "FAILED", message: "Invalid name entered", });

    } else if(password.length < 8) {
        res.json({
            status: "FAILED", message: "Password too short!", });
    }

    else {
        const restaurant = await Restaurant.findOne({ownerEmail: ownerEmail})

        if (restaurant) return res.status(400).send("Restaurant already registered!");
        else {
            try {
                const restaurant= Restaurant.create({ownerEmail, password, ownerName, location, name})
            } catch (error) {
                res.status(400).json({error: error.message})
            } 
        }
    }
}


//delete a restaurant
const deleteRestaurant = async (req, res) => {
    //getting id from params
    const {id} = req.params

    //if an invalid type of id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : "No such restaurant exists!"})
    }

    const restaurant = await Restaurant.findOneAndDelete({_id: id})
    //if no such restaurant exists!
    if(!restaurant) {
        return res.status(404).json("No such restaurant exists!")
    }
    res.status(200).json(restaurant)
}


//update restaurant's details
const updateRestaurant = async (req, res)=> {
    //getting id from params
    const {id} = req.params

    //if an invalid type of id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : "No such restaurant exists!"})
    }

    const restaurant = await Restaurant.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!restaurant) {
        return res.status(404).json("No such restaurant exists!")
    }
    res.status(200).json(restaurant)
}

//login
const login = async (req, res) => {
    const {email,password} =req.body;
    const restaurant = await Restaurant.findOne({ownerEmail: email})

    if(restaurant && restaurant.isVerified === true) {
            if(password===restaurant.password) {
                res.status(200).json({message:"login sucess",restaurant:restaurant})
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
    getRestaurant,
    register,
    deleteRestaurant,
    updateRestaurant,
    login
}