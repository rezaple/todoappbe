const authController = require('../controllers/auth');
const express = require('express');
const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/verify', authController.verify);

module.exports = router;