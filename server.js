const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");


const PORT = 3000;

// Initialize Express
const app = express();

// Parse JSON Requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static());

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/thrasher";
mongoose.connect(MONGODB_URI);

// Server 
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});


