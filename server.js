const express = require('express');
require('dotenv').config();
const mongoose=require('mongoose');


// var  createError = require("http-errors");
// var  path = require("path");
// var  cookieParser = require("cookie-parser");
// var  logger = require("morgan");
// const  bodyParser = require("body-parser");

const customerRoutes = require ('./routes/customers')
const restOwnerRoutes = require ('./routes/restOwners')
const restaurantRoutes = require ('./routes/restaurants')
const adminRoutes = require ('./routes/admin')


//express app
const app = express();

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/customer',customerRoutes)
app.use('/api/restOwner',restOwnerRoutes)
app.use('/api/restaurant', restaurantRoutes)
app.use('/api/admin', adminRoutes)




//connect db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listening to port
    app.listen( process.env.PORT, () => {
    console.log('connected to db and listening on port', process.env.PORT)
});

})
.catch((error) => {
    console.log(error);
})


process.env