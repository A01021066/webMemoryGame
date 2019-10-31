const express = require('express');
const controller = require('../controller/userController');
const router = express.Router();

router.get('/ranking', controller.getAllUser);

router.get('/summary', controller.getAddUser);

router.post('/summary', controller.postAddUser);

module.exports = router;