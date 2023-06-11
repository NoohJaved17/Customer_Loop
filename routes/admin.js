const express = require('express')
const router= express.Router()

const {getAll, getAdmin, register, deleteAdmin, updateAdmin, login} = require ('../controllers/adminController')

router.get('/', getAll)

router.get('/:id', getAdmin)

//router.post('/register', register) 

//router.delete('/:id', deleteAdmin)

//router.patch('/:id', updateAdmin)

router.post('/login', login)
module.exports = router;