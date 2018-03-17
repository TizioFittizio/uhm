const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile("server.log", log + "\n", err => 0);
    next();
})

/*app.use((req, res, next) => {
    res.render('manteinance.hbs');
})*/

app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', text => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: "Dio porco",
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
});

app.get('/bad', (req, res) => {
    res.sendStatus(500).send('Uhm');
})

app.listen(port, () => {
    console.log("..." + port);
});