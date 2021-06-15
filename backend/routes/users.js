const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users');
const auth = require('../middleware/auth');


router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.get('/profiles/', auth, usersCtrl.getAllProfiles);
router.get('/profile/', auth, usersCtrl.getProfile);
router.get('/profile/:id', auth, usersCtrl.getOneProfile);
router.put('/profile/', auth, usersCtrl.modifyProfile)
router.delete('/profile/:id', auth, usersCtrl.deleteProfile )


module.exports = router;