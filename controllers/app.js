//Dependencies
const axios = require("axios");
const cheerio = require("cheerio");

//Models
const db = require("../models");


exports.homePage = function (req, res) {
    res.render('index')
}

exports.scrape = function (req, res) {
    console.log("scraped_")

    axios.get("http://www.thrashermagazine.com/").then(function (response) {

        const $ = cheerio.load(response.data);

        $("h4.post-title").each(function (i, element) {
            // console.log(element)
            const result = [];

            let title = $(element).find("a").text();
            let link = $(element).find("a").attr("href");
            console.log("title: " + title)
            console.log("link: " + link)

            result.push({
                title: title,
                link: link
            })

            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
            console.log(result)
        });

        console.log("thrasher scraped!")
        res.send("Scrape Complete");


    });
};

