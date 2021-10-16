const express = require('express');
const router = express.Router();
const { userById } = require('../controllers/authController');

const {list, create, remove, categoryById} = require('../controllers/categoryController');

router.get('/categories', list);
router.param('userId', userById);
router.post('/create/:userId', create);
router.param('categoryId', categoryById);
router.delete('/:categoryId', remove);



module.exports = router;
