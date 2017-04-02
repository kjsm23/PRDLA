/**
 * Created by --- on 1/26/2017.
 */
var router = require('express').Router();
var path = require('path');
var appDir = path.dirname(require.main.filename);
router.use('/api', require('./api/index'));

router.get('/:uName/:panoName', function (req, res) {
  console.log(appDir);
  var dir =   '/Users/Diator/Documents/WebstormProjects/PRDLA/img/User/upload/'+req.params.uName + '/' + req.params.panoName;


  res.sendFile(dir);
})

module.exports = router;
