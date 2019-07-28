module.exports = function (app) {

    const indexPage = require('./routes/app');

    app.use('/', indexPage)
}