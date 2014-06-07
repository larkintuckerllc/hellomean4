var express = require('express');
var router = express.Router();
var wines = require('../controllers/wines');

router.get('/', wines.findAll);
router.get('/:_id', wines.findById);
router.post('/', wines.add);
router.put('/:_id', wines.update);
router.delete('/:_id', wines.delete);

module.exports = router;
