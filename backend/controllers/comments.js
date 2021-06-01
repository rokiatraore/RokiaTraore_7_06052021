//Importations
const models = require('../models');
const utilsAuth = require('../utils/jwtUtils');



exports.createComment = (req, res) => {
    //Récupérer le header d'autorisation de la requête
    let userId = utilsAuth.getUserId(req.headers.authorization);
    //Récupérer l'id du post
    let messageId = parseInt(req.params.id);

    //Vérifier si c'est le même utilisateur qui exécute la demande
    models.User.findOne({
        where: { id: userId},
    })
    models.Comment.create({
        message: req.body.message,
        UserId : userId ,
        MessageId: messageId,
    })
    .then(() => res.status(201).json({message: 'Commentaire publié'}))
    .catch(error => res.status(500).json(error));
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

exports.deleteComment = (req,res) => {
    models.Comment.destroy({
        where:{ id: req.params.id}
    })
    .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.updateComment =  (req, res)=>{  
    let userId = utilsAuth.getUserId(req.headers.authorization);
    //Récupérer l'id du post
    let messageId = parseInt(req.params.id);

    models.Comment.update({
       message : req.body.message,
       UserId : userId ,
        MessageId: messageId,
    },
    { where : 
        {
           messageId : messageId,
           id : userId
       }
    }
   )
   .then(() =>  res.status(201).json({ message : 'Commentaire modifié !' }))
   .catch(error =>  res.status(500).json(error))
}

       