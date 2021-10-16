const express = require('express');
const router = express.Router();

const { list, read, create, remove, birdById, photo } = require('../controllers/birdController');

router.get('/birds', list);
router.post('/create', create);

router.param('birdId', birdById);

router.get('/photo/:birdId', photo)

router.get('/:birdId', read)


router.delete('/:birdId', remove);

module.exports = router;