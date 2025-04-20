const express = require('express');
const router = express.Router();
const controller = require('../controllers/itemController');

// Not for production
//router.get('/:id', controller.getUser);

// Get items by id
router.post('/getItems', controller.getOwnedItems);

// Create new item
router.post('/create', controller.createItem);

module.exports = router;
