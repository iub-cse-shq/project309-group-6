const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
// Load User model
// const Hotels = require('../models/Hotels');

//Connect To Mongo
mongoose.connect('mongodb://localhost:27017/travelTart',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;

// router.get('/username', ensureAuthenticated, (req, res) =>
//  res.render('partials/username', {
//     name: req.user.name
//  }));

router.get('/',  ensureAuthenticated, (req, res) => {
  const collection = db.collection('Hotels')
   collection.find({}).toArray(function(err, hotels){
   // assert.equal(err, null);
   res.render('dashboard.ejs', {'Hotels': hotels})
});
});

 router.get('/dashboard',  ensureAuthenticated, (req, res) => {
  const collection = db.collection('Hotels')
   collection.find({}).toArray(function(err, device_list){
   // assert.equal(err, null);
   res.render('dashboard2.ejs', {'Hotels': device_list})
})
});



//Add Hotels
// router.post('/add', (req, res) =>{
//    const { hotel, location, features  } = req.body; 
//    const newHotels = new Hotels({
//       hotel,
//       location,
//       features
//   }); 
   //save hotels
//    newHotels.save()
//    .then(hotels =>{
//        req.flash('success', 'Registered Successfully');
//        res.redirect('/dashboard');
//    })
//    .catch(err => console.log(err))
  
//  });

module.exports = router;