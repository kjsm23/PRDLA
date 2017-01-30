/**
 * Created by --- on 1/26/2017.
 */
var router = require('express').Router();

router.use('/api', require('./api/index'));

module.exports = router;
