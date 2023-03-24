const express = require('express')
const router= express.Router()
const {getAll, getCustomer, signUp, verifyOtp, deleteCustomer, updateCustomer, login} =
 require('../Controllers/customerController');

router.get('/', getAll);
router.get('/:id', getCustomer)
router.post('/signUp', signUp);
router.post('/signup/verifyOtp', verifyOtp);
router.delete('/:id', deleteCustomer);
router.patch('/:id', updateCustomer);
router.post('/login', login);


module.exports = router;