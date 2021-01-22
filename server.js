const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express()

//Connect To Mongo
mongoose.connect('mongodb://localhost:27017/travelTart',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

//Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/js', express.static(__dirname + 'public/js'))

// EJS
app.use(expressLayouts);
app.set('views', './views');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/users'));

app.listen(3000)