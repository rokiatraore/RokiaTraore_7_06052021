//Importations
const models = require('../models');
const utilsAuth = require('../utils/jwtUtils');

exports.createComment = (req, res) => {
    //Récupérer le header d'autorisation de la requête
    let userId = utilsAuth.getUserId(req.headers.authorization);
    //Récupérer l'id du post
    let messageId = parseInt(req.params.id);

    models.User.findOne({
        attributes: ['id', 'email', 'username', 'isAdmin'],
        where: {id: userId}
    })
        .then(user => {
            if (user) {
                models.Comment.create({
                    message: req.body.message,
                    name: user.username,
                    UserId : userId ,
                    MessageId: messageId,
                })
                res.status(201).json({message: 'Commentaire publié'});
            } 
        })
        .catch(error =>  res.status(500).json({ error }))
}

exports.getAllComments = (req, res) => {
    models.Comment.findAll({
        include: [{
            model: models.User,
            attributes: ['username']
        }]    
    })
    .then(messages => res.status(200).json(messages))
    .catch(error => res.status(400).json({ error }));
    
}

exports.getOneComment = (req, res) => {
    models.Comment.findOne({
        where: { id: req.params.id}
    })
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(404).json({ error }))
}

exports.deleteComment = async (req,res) => {
    //Récupérer le header d'autorisation de la requête
   try {
        let userId = await utilsAuth.getUserId(req.headers.authorization);
        let comment = await models.Comment.findOne({where: { id: req.params.id}})
    
        if(userId === comment.UserId) {
            models.Comment.destroy({where:{ id: req.params.id}});
            res.status(200).json({ message: 'Commentaire supprimé !'})
        } 
        else {
            res.status(400).json({message : "Vous n'avez pas les droits requis"})
        }
    }
    catch(error) {
        res.status(500).json({ error })
    };
}


       