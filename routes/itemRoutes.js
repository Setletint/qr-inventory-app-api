const express = require('express');
const router = express.Router();
const controller = require('../controllers/itemController');

// Not for production
//router.get('/:id', controller.getUser);

// Get item by id
router.post('/get/:id', controller.getItemInfo);

// Update item
router.post('/update/:id', controller.updateItem);

// Add calendar event for item
router.post('/item/:id/calendar', controller.addCalendar);

// Delete calendar event
router.delete('/item/:id/calendar', controller.deleteCalendarEvent);

// Get calendar events
router.get('/itme/:id/calendar', controller.getCalendar);

// Get item qrCode
router.get('/getQrCode/:id', controller.getQrCode);

// Get items user own
router.post('/getItems', controller.getOwnedItems);

router.post('/create', controller.createItem);

// Set Authorized users (for callender aswell)
router.post('/setAuthorizedUsers/:id', controller.updateAuthorizedUsers);

module.exports = router;
