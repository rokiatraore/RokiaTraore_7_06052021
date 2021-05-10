//Importations
const models = require('../models');
const bcrypt = require('bcrypt');
const jwtAuth = require('../middleware/auth'); 

exports.signup = (req, res) => {
    //Trouver l'utilisateur ayant le même email dans la bdd
    models.User.findOne({
        where: { email: req.body.email}
    })
    .then(userFound => {
        if (!userFound) {
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const newUser =  models.User.create ({
                        email: req.body.email,
                        username: req.body.username,
                        password: hash,
                        isAdmin: 0
                    })
                    //Enregistrer dans la base de données
                    .then( newUser => res.status(201).json({ 
                        message: 'Utilisateur créé',
                        'userId': newUser.id
                    }))
                    .catch(error => res.status(400).json({ error }))
                })
        } else {
            return res.status(500).json({ error: 'Utilisateur existe déjà'})
        }
    })
};

exports.login = (req, res) => {
    //Trouver l'utilisateur ayant le même email dans la bdd
    models.User.findOne({ 
        where: {email: req.body.email}
    })
        .then(userFound => {
            //Si on n'a pas trouvé d'utilisateur
            if (!userFound){
                return res.status(401).json({ error: 'Utilisateur non trouvé !'});
            }
            //Comparer le mdp de l'utilisateur avec la hash
            bcrypt.compare(req.body.password, userFound.password)
                .then(passwordValid => {
                    //Si la comparaison est false
                    if (!passwordValid) {
                        return res.status(401).json({ error: 'Mot de passe incorrecte !'});
                    }
                    res.status(200).json({
                        userId: userFound.id,
                        //Authentification : encoder un nouveau token
                        token: jwtAuth.generateTokenForUser(userFound)
                    });
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getProfile = (req,res) => {
    //Récupérer le header d'autorisation de la requête
    let headerAuth = req.headers['authorization'];
    let userId = jwtAuth.getUserId(headerAuth);

    models.User.findOne({
        attributes: ['id', 'email', 'username'],
        where: {id: userId}
    })
        .then(user => {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(404).json( { error: 'Utilisateur non trouvé'})
            }
        })
        .catch(error =>  res.status(500).json({ error }))
};

