const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
    //var multer = require('multer');
    //var forms = multer();

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())
    //app.use(forms.array());
app.listen(3000);
//
app.set('view engine', 'ejs');
app.set('views', './views');
//
app.use(express.static('Public'));
app.use(express.static("views"));
// connect to mongoose
mongoose.connect('mongodb+srv://nhatlongtien229:Qazwsx@229@cluster0-8moas.mongodb.net/ControlPageDemo?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, function(error) {
    if (error) {
        console.log('Fail to connect to mongoose')
    } else {
        console.log('success to connect to mongoose')
    }
});
//
const marvelRoute = require('./Route/Marvel.route')
app.use('/marvel', marvelRoute);