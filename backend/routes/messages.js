const express = require('express');
const router = express.Router();

const messageCtrl = require('../controllers/messages');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//routes
router.post('/new',auth, multer, messageCtrl.createMessage);
router.get('/', messageCtrl.getAllMessage);
router.get('/:id', auth, messageCtrl.getOneMessage);
router.put('/:id',auth, multer, messageCtrl.modifyMessage);
router.delete('/:id', messageCtrl.deleteMessage);




module.exports = router;