//Importations
const models = require('../models');
const jwtAuth = require('../middleware/auth');

exports.createMessage = (req, res) => {
    //Récupérer le header d'autorisation de la requête
    let headerAuth = req.headers['authorization'];
    let userId = jwtAuth.getUserId(headerAuth);

    models.User.findOne({
        where: { id: userId}
    })
     //Enregistrer dans la base de données
    .then((user) => {
        if(user){
            models.Message.create({
                title: req.body.title,
                content: req.body.content,
                comments: 0,
                attachment:'ab',
                UserId : user.id
            })
            .then(() => res.status(201).json({message: 'message publié'}))
            .catch(error => res.status(500).json(error));

        }
    })
    .catch(error => res.status(400).json({ error }))
}


exports.getAllMessage = (req, res) => {
    models.Message.findAll({
        include: [{
            model: models.User,
            attributes: ['username']
        }]
    })
    .then(messages => res.status(200).json(messages))
    .catch(error => res.status(400).json({ error }));
    
}




