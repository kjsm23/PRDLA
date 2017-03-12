/**
 * Created by --- on 3/11/2017.
 */
/**
 * Created by --- on 1/26/2017.
 */

var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');



var needsGroup = function(usertipo){
  return [
    function (req,res,next) {
      if(req.user && req.user.usertipo === usertipo)
        next();
      else
        res.send(401,'Unauthorized');
    }
  ];
};



module.exports = router;
