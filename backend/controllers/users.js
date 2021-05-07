//Importations
const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        .then(user => {
            //Si on n'a pas trouvé d'utilisateur
            if (!user){
                return res.status(401).json({ error: 'Utilisateur non trouvé !'});
            }
            //Comparer le mdp de l'utilisateur avec la hash
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    //Si la comparaison est false
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrecte !'});
                    }
                    res.status(200).json({
                        userId: user.id,
                        //Authentification : encoder un nouveau token
                        token: jwt.sign(
                            { userId: user.id },
                            //Clé secrète
                            'RANDOM_SECRET_KEY',
                            //Expiration de la clé secrète
                            { expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
};

