// MODELS
const db = require('./models');
var express = require('express');
var router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/scrape", function (req, res) {

    axios.get("http://www.thrashermagazine.com/").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
        console.log(response)
        // Now, we grab every h2 within an article tag, and do the following:
        $("li.junk-drawer-item h4").each(function (i, element) {

            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
            res.json(dbArticle)
        });

        // Send a message to the client
        // res.send("Scrape Complete");
        // res.json(result)
        console.log(results)

    });
});