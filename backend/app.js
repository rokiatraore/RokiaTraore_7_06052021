//Importations
const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');

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


//Enregistrer les routeurs pour les demandes effectuées vers leurs routes
app.use('/api/', usersRouter);
app.use('/api/', messagesRouter);

module.exports = app;