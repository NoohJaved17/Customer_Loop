const Restaurant = require('../models/restaurantModel')
const mongoose = require ('mongoose')

//get All
const getAllRestaurant = async (req, res) => {
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
    //getting data from req
    const {ownerEmail, ownerName, location, name} = req.body

    //add a new restaurant to db
    try {
        const restaurant= await Restaurant.create({ownerEmail, ownerName, location, name})
        res.status(200).json(restaurant)
    } catch (error) {
        res.status(400).json({error: error.message})

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


module.exports = {
    getAll,
    getRestaurant,
    register,
    deleteRestaurant,
    updateRestaurant
}