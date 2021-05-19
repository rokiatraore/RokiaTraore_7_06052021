const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users');
const auth = require('../middleware/auth');


router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.get('/profile', auth, usersCtrl.getProfile)


module.exports = router;