//Importations
const express = require('express');
const app = express();
const path = require('path');

const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');
const commentsRouter = require('./routes/comments');

//Ajout des headers pour autoriser l'accès à l'API
app.use('/',(req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type,text/html, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//Transformer le corps de la requête en objet JS
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Gestion des images
app.use('/images', express.static(path.join(__dirname, 'images')));

//Enregistrer les routeurs pour les demandes effectuées vers leurs routes
app.use('/api/', usersRouter);
app.use('/api/messages/', messagesRouter);
app.use('/api/', commentsRouter);

module.exports = app;