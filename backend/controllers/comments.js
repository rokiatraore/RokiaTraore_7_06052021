//Importations
const models = require('../models');
const utilsAuth = require('../utils/jwtUtils');

exports.createComment = (req, res) => {

       const newc = models.Comment.create(
        {
            UserId:     req.body.id,
            MessageId:  req.params.id,
            message:    req.body.message
        })
        if (newc){
            res.status(201).json({ message: "Commentaire ajouté !" })
        } else {
    
    res.status(400).json({ error })}
};