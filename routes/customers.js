const express = require('express')
const router= express.Router()
const {getAll, getCustomer, signUp, verifyOtp, deleteCustomer, updateCustomer, login} =
 require('../controllers/customerController');

router.get('/', getAll);
router.get('/:id', getCustomer)
router.post('/signUp', signUp);
router.post('/signUp/verifyOtp', verifyOtp);
router.delete('/:id', deleteCustomer);
router.patch('/:id', updateCustomer);
router.post('/login', login);


module.exports = router;