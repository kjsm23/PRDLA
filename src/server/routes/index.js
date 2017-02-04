/**
 * Created by --- on 1/26/2017.
 */
var router = require('express').Router();

router.use('/api', require('./api/index'));

router.get('/:uName/:panoName', function (req, res) {
  	
	var dir =  '/Users/Diator/Desktop/Git_kenin/PRDLA/img/User/upload/'+req.params.uName + '/' + req.params.panoName;

  res.sendFile(dir);
})

module.exports = router;
