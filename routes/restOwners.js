const express = require('express')
const router= express.Router()

const {getAll, getRestOwner, signUp, verifyOtp, deleteRestOwner, updateRestOwner, login} = require ('../controllers/restOwnerController')

router.get('/', getAll)

router.get('/:id', getRestOwner)

router.post('/register', signUp) 

router.delete('/:id', deleteRestOwner)

router.patch('/:id', updateRestOwner)

router.post('/login', login)


module.exports = router;