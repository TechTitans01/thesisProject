const db =require("../sequelize/index")
module.exports ={
    getAdmin:(req, res) => {
        db.admin.findOne({ where: { id: req.params.id } })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send(err);
        });
}
}