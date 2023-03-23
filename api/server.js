require("dotenv").config();
const express = require("express");

const connectDB = require("./config/db");

const app = express();

// routes
const Customer = require("./routes/Customer"); // added

// connect database
connectDB();

// initialize middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Server up and running"));

// use routes
app.use("/api/Customer", Customer); // added

// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});