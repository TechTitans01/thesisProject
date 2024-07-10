const db=require("../sequelize/index.js")
const { nodeMailer } = require("../../lib/nodeMailer");

module.exports={
    sendReclamation:(req, res) => {
    db.reclamation.create(req.body)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  getAllReclamation : (req, res) => {
    db.reclamation.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getOneReclamationByEmail:(req, res) => {
    db.reclamation.findOne({ where: { email: req.body.email } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  sendReclamtionGmail: async (req, res) => {
    try {
      await nodeMailer(req.body.to,req.body.subject,req.body.html);
      res.send( "mail sent");
    } catch (err) {
      res.status(500).send("Failed to send email");
    }
  }

}