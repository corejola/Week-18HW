const express = require('express');
const router = express.Router();

const indexPage = require("../controllers/app");

router.get('/', indexPage.homePage);

router.get('/scrape', indexPage.scrape)

router.get('/articles', indexPage.articles)

module.exports = router;