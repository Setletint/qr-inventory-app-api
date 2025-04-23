const express = require('express');
const router = express.Router();
const controller = require('../controllers/itemController');

// Not for production
//router.get('/:id', controller.getUser);

// Get item by id
router.post('/:id', controller.getItemInfo);

// Get items user own
router.post('/getItems', controller.getOwnedItems);

// Create new item
router.post('/create', controller.createItem);

// Set Authorized users (for callender aswell)
router.post('/setAuthorizedUsers', controller.updateAuthorizedUsers);

module.exports = router;
