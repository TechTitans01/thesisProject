const db=require("../sequelize/index.js")


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

}