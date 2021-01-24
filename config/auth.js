module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      // req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/login');
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      if  (userType === 'Traveller'){
        res.redirect('/');
      }else if (userType === 'Guest House') {
        res.redirect('/dashboard');
      }
           
    }
  };