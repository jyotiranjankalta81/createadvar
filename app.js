const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const port = 80;
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactAdvar', {useNewUrlParser: true});

// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    Gender: String,
    phone: String,


});
const Contact = mongoose.model('Contact', contactSchema);

//Express Specific Stuff
app.use('/static', express.static('static'))
app.use(express.urlencoded())
// Pug Specific Stuff
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
// Endpoint
app.get('/', function (req, res) {
    res.status(200).render('index.pug');
})
app.post('/', function (req, res) {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been save to the datbase")
    }).catch(()=>{
        res.status(400).send("Item was not save to database")
    });
    // res.status(200).render('Contact.pug');
})
app.get('/Contact', function (req, res) {
    res.status(200).render('Contact.pug');
})
app.post('/Contact', function (req, res) {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been save to the datbase")
    }).catch(()=>{
        res.status(400).send("Item was not save to database")
    });
    // res.status(200).render('Contact.pug');
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
