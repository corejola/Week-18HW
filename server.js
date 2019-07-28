// DEPENDENCIES
const express = require("express");
const path = require('path');
const mongoose = require("mongoose");

const axios = require("axios");
const cheerio = require("cheerio");

// MODELS
const db = require('./models');

const PORT = 3000;

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
// require('./routes')(app);


const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/thrasher";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get("/scrape", function (req, res) {

    axios.get("http://www.thrashermagazine.com/").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        const $ = cheerio.load(response.data);
        // Now, we grab every h2 within an article tag, and do the following:
        $("div.post-thumb-link").each(function (i, element) {
            // Save an empty result object
            const result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
            res.json(dbArticle)
        });

        // Send a message to the client
        res.send("Scrape Complete");
        // res.json(result)

    });
});

// Server 
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});


