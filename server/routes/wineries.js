var express = require('express');
var router = express.Router();
var wineries = require('../controllers/wineries');

router.get('/', wineries.findAll);
router.get('/:_id', wineries.findById);
router.post('/', wineries.add);
router.put('/:_id', wineries.update);
router.delete('/:_id', wineries.delete);

module.exports = router;
