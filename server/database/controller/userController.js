
const db=require("../sequelize/index.js")
const bcrypt = require("bcrypt");
module.exports={
updateUser:(req,res)=>{
    db.user.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(404).send("Invalid email");
      }

      bcrypt.compare(req.body.password, user.dataValues.password)
        .then((samepassword) => {
          if (samepassword) {

            if (req.body.newPassword) {

              bcrypt.hash(req.body.newPassword, 10)
                .then((hashedNewPassword) => {
                  db.user.update({
                    fullname: req.body.fullname,
                    address: req.body.address,
                    password: hashedNewPassword,
                    phoneNumber:req.body.phoneNumber,
                    birthday: req.body.birthday,
                    gender: req.body.gender,
                    image:req.body.image
                  }, { where: { email: req.body.email } })
                    .then((result) => {
                      res.send(result);
                    })
                    .catch((updateError) => {
                      console.error("Update error:", updateError);
                      res.status(500).send(updateError);
                    });
                })
                .catch((hashError) => {
                  console.error("Hash error:", hashError);
                  res.status(500).send(hashError);
                });
            } else {

              db.user.update({
                fullname: req.body.fullname,
                address: req.body.address,
                phoneNumber:req.body.phoneNumber,
                birthday: req.body.birthday,
                gender: req.body.gender,
                image:req.body.image
              }, { where: { email: req.body.email } })
                .then((result) => {
                  res.send(result);
                })
                .catch((updateError) => {
                  console.error("Update error:", updateError);
                  res.status(500).send(updateError);
                });
            }
          } else {
            res.status(401).send("Invalid password");
          }
        })
        .catch((compareError) => {
          console.error("Password comparison error:", compareError);
          res.status(500).send(compareError);
        });
    })
    .catch((findError) => {
      console.error("Find user error:", findError);
      res.status(500).send(findError);
    });


},

getOneUser:(req, res) => {
    db.user.findOne({ where: { id: req.params.id } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getOneUserByemail:(req, res) => {
    db.user.findOne({ where: { email: req.params.email } })
      .then(data => {
        if(!data){
          res.send(err)
        }
        res.send(data)
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },

  removeUser:(req, res) => {
    db.user.destroy({ where: { id: req.params.id } })
      .then(() => {
        res.sendStatus(201)
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },


 getAllUser : (req, res) => {
  db.user.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err);
    });
},
  addUser:(req, res) => {
    db.user.create(req.body)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },




}

