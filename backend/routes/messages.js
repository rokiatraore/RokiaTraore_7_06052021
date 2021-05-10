const express = require('express');
const router = express.Router();

const messageCtrl = require('../controllers/messages');

//routes
router.get('/messages/new', messageCtrl.createMessage);
router.get('/messages/all', messageCtrl.getAllMessage
);




module.exports = router;