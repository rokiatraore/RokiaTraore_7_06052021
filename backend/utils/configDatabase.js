const mysql = require('mysql');
const dotenv = require("dotenv");

dotenv.config({path: './.env'}); //masquage des informations sensibles comme les idantifiants et les mots de passes

const NAME = process.env.API_NAME;
const PASS = process.env.API_PASS;
const HOST = process.env.API_HOST;

//Connexion à la base de donnée Mysql

const db = mysql.createConnection({
    host : HOST,
    username : NAME,
    password : PASS,
    database: 'database_development_oc',
    port: 3000,
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connexion réussie !');
});

module.exports = db;
