const express = require('express')
const router= express.Router()

const {getAll, getRestaurant, register, deleteRestaurant, updateRestaurant, login} = require ('../controllers/restaurantController')

router.get('/', getAll)

router.get('/:id', getRestaurant)

router.post('/register', register) 

router.delete('/:id', deleteRestaurant)

router.patch('/:id', updateRestaurant)

router.post('/login', login)



module.exports = router;