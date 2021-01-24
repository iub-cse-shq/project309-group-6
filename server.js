const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express()

// Passport Config
require('./config/passport')(passport);

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

// Express body parser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

// Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/users'));

app.post("/add",(req,res)=>{
  var hotel = req.body.hotel;
  var location = req.body.location;
  var features = req.body.features;
  
  var data = {
      "hotel": hotel,
      "location" : location,
      "features" : features,
  }

  db.collection('Hotels').insertOne(data,(err,collection)=>{
      if(err){
          throw err;
      }
      console.log("Record Inserted Successfully");
  });

  return res.redirect('/dashboard')

})


app.listen(3000)