const express = require("express");
const router = express.Router();

const {
    getAllCustomer,
    postCreateCustomer,
    putUpdateCustomer,
    deleteCustomer,
} = require("../controllers/Customer");

/**
 * @route GET api/Customer
 * @description get all Customer
 * @access public
 */
router.get("/", getAllCustomer);

/**
 * @route POST api/Customer
 * @description add a new Customer
 * @access public
 */
router.post("/", postCreateCustomer);

/**
 * @route PUT api/Customer/:id
 * @description update Customer
 * @access public
 */
router.put("/:id", putUpdateCustomer);

/**
 * @route DELETE api/Customer/:id
 * @description delete Customer
 * @access public
 */
router.delete("/:id", deleteCustomer);

module.exports = router;