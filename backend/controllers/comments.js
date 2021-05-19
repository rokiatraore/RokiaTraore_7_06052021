//Importations
const models = require('../models');
const utilsAuth = require('../utils/jwtUtils');


exports.createComment = (req, res) => {
      let userId = utilsAuth.getUserId(req.headers.authorization);
      var messageId = parseInt(req.params.id);

    models.User.findOne({
        where: { id: userId}
    })

    //Enregistrer dans la base de donnée
    models.Comment.create({
        name: req.body.name,
        message: req.body.message,
        UserId : userId ,
        MessageId: messageId
    })
    .then(() => res.status(201).json({message: 'Commentaire publié'}))
    .catch(error => res.status(500).json(error));
}
       