//Importations
const models = require('../models');
const utilsAuth = require('../utils/jwtUtils');

exports.createMessage = (req, res) => {
    //Récupérer le header d'autorisation de la requête
    let userId = utilsAuth.getUserId(req.headers.authorization);
    
    models.User.findOne({
        where: { id: userId}
    })
     //Enregistrer dans la base de données
    .then((user) => {
        if(user){
            models.Message.create({
                title: req.body.title,
                content: req.body.content,
                attachment:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
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
        include: ["comments"]    
    })
    .then(messages => res.status(200).json(messages))
    .catch(error => res.status(400).json({ error }));
    
}

exports.getOneMessage = (req, res) => {
    models.Message.findOne({
        where: { id: req.params.id}
    })
        .then(message => res.status(200).json(message))
        .catch(error => res.status(404).json({ error }))
}

exports.modifyMessage = (req, res) => {
    
    let headerAuth = req.headers['authorization'];
    let userId = jwtAuth.getUserId(headerAuth);
}

exports.deleteMessage = (req, res) => {
    
    //Récupérer le header d'autorisation de la requête
    let userId = utilsAuth.getUserId(req.headers.authorization);

    models.Message.deleteOne({
        where: { id: userId}
    })
    .then(() => res.status(200).json("Post supprimé"))
    .catch(error => res.status(404).json({ error }))
}




