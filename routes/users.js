const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Load User model
const User = require('../models/User');

//login page
router.get('/login', (req, res) => res.render('login'));

//register page
router.get('/register', (req, res) => res.render('register'));

//register handle
router.post('/register', (req, res) =>{
    const { name, email, password, password2 , userType } = req.body;
    let errors = [];
  
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        //Validation passed
        User.findOne({email: email})
        .then(user =>{
            if(user){
                //User exists
                errors.push({ msg: 'Email is already Registered' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                  });
            }else{
                const newUser = new User({
                    name,
                    email,
                    password,
                    userType
                });
               //Hash Password
               bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(newUser.password, salt, (err,hash) =>{
                    if(err) throw err;
                    //set password to hashed
                    newUser.password = hash;
                    //save user
                    newUser.save()
                    .then(user =>{
                        req.flash('success', 'Registered Successfully');
                        res.redirect('/login');
                    })
                    .catch(err => console.log(err))
               }))
            }
        });
      }
});

// Login handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  // req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
});

module.exports = router;