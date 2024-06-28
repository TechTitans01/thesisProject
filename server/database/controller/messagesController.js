const { Op } = require('sequelize');
const db=require("../sequelize/index.js")

module.exports = {
    getAllMessages: (req, res) => {
      db.messages.findAll()
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    },
  
    addMessage: (req, res) => {
      db.messages.create(req.body)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    },
  
    getMessagesBetweenUsers: (req, res) => {
      const { senderId, receiverId } = req.params;
  
      db.messages.findAll({
        where: {
          [Op.or]: [
            { senderId: senderId, receiverId: receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        },
      })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    },
  };