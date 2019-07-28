// DEPENDENCIES
const express = require("express");
const path = require('path');
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;;

// Initialize Express
const app = express();

//set up handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Parse JSON Requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
require('./routes')(app);


const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/thrasher";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Server 
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});


module.exports = app;