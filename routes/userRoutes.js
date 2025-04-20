const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

// Not for production
//router.get('/:id', controller.getUser);

router.post('/register', controller.createUser);

module.exports = router;
