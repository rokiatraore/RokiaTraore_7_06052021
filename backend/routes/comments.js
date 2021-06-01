const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comments");

router.post("/comment/:id", auth, commentCtrl.createComment);
router.get('/comment/:id', auth, commentCtrl.getOneComment);
router.put('/comment/:id', auth, commentCtrl.updateComment);
router.delete("/comment/:id", auth, commentCtrl.deleteComment)

module.exports = router;