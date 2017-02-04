/**
 * Created by --- on 1/26/2017.
 */
var router = require('express').Router();
var passport = require('passport');
var mongoose = require('mongoose');
var Pano = mongoose.model('Pano');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var auth = require('../auth');


router.get('/', auth.optional, function(req, res, next) {

	Pano.find().then(function(panos){
    return res.json({Pano: panos});
  	});
	//console.log(Pano);
	//return res.json({Pano: Pano.toJSONFor(user)});

	//return res.json({Pano: Pano});

});

router.post('/', auth.required, function(req,res,next){

	//Pano.



});
module.exports = router;