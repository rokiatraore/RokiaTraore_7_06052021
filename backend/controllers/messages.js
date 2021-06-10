//Importations
const models = require('../models');
const utilsAuth = require('../utils/jwtUtils');
const fs = require('fs')

exports.createMessage = async (req, res) => {
const userId = utilsAuth.getUserId(req.headers.authorization);
  let imageUrl;
  try {
    const user = await models.User.findOne({where: { id: userId }});
    if (user !== null) {
      if (req.file) {
        imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
      } else {
        imageUrl = null;
      }
      const post = await models.Message.create({
        include: [
          {
            model: models.User,
            attributes: ["username"],
            required:true,
          },
        ],
        title: req.body.title,
        content: req.body.content,
        attachment: imageUrl,
        UserId : user.id
      });

      res
        .status(201)
        .json({ post: post, messageRetour: "Votre post est ajouté" });
    } else {
      res.status(400).send({ error: "Erreur " });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};


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

exports.modifyMessage = async (req, res) => {
  try {
    //Récupérer le header d'autorisation de la requête
    let userId = await utilsAuth.getUserId(req.headers.authorization);
    let post = await models.Message.findOne({where: { id: req.params.id}});

    if(userId === post.UserId) {
      models.Message.update(
        { title: req.body.title, content: req.body.content } || {
          ...req.body,
          attachment: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        },
        {
          where: {
              userId: userId,
              id: req.params.id,
          },
        }
      )
      res.status(201).json({ message : "Votre post a été modifié"})
    } else {
      res.status(400).json({ message: "Vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
}

exports.deleteMessage = async (req, res) => {
    
  try {
    //Récupérer le header d'autorisation de la requête
    let userId = await utilsAuth.getUserId(req.headers.authorization);
    let post = await models.Message.findOne({where: { id: req.params.id}});

    if(userId === post.UserId) {
      if(post.imageUrl) {
        const filename = post.imageUrl.split("/images")[1];
        fs.unlink(`images/${filename}`, () => {
          models.Message.destroy({ where: { id: post.id }});
          res.status(200).json({ message: "Post supprimé" });
        })
      }
      else {
        models.Message.destroy({ where: { id: post.id}})
        res.status(200).json({ message: "Post supprimé" });
      }
    } else {
      res.status(400).json({ message: "Vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
}




