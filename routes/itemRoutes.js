const express = require('express');
const router = express.Router();
const controller = require('../controllers/itemController');

// Not for production
//router.get('/:id', controller.getUser);

router.post('/', controller.getOwnedItems);

module.exports = router;
