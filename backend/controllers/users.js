const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    //Renseigner les paramètres
    let email = req.body.email;
    let password = req.body.password;

    //Champs obligatoire
    if (email == null || password == null) {
        return res.status(400).json({ 'error': 'paramètre manquant'})
    }

    models.User.findOne({
        attributes: ['email'],
        where: { email: email}
    })
    .then(userFound => {
        if (!userFound) {
            
        //Crypter le mot de passe
        bcrypt.hash(password, 10)
        .then(hash => {
            const newUser =  models.User.create ({
                email: email,
                password: hash,
                isAdmin: 0
            })
            //Enregistrer dans la base de données
            .then(newUser => res.status(201).json({ 
                'userId': newUser.id
            }))
            .catch(error => res.status(500).json({ 'error': 'utilisateur pas ajouté'}))

        })
        .catch(error => res.status(500).json({ error }));

        } else {
            return res.status(400).json({ 'error': 'utilisateur existe déjà'})
        }
    })
    .catch(error => res.status(500).json({ 'error': 'verifier lutilisateur'}));
    
};