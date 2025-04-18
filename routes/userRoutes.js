const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/', controller.getAllUsers);
router.post('/', controller.createUser);

module.exports = router;
