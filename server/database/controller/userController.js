const db=require("../sequelize/index.js")
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
             const db = require("../sequelize/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    signin: async (req, res) => {
        const { fullname, email, password, username } = req.body;
        try {
            // Hashing the password
            const hashedPassword = await bcrypt.hash(password, 10);
            // Storing the hashed password in the database
            const newUser = await db.user.create({
                fullname,
                email,
                password: hashedPassword,
                username
            });
            res.status(201).json(newUser);
        } catch (err) {
            res.status(500).json({ err: err.message });
        }
    }
};

              bcrypt.hash(req.body.newPassword, 10)
                .then((hashedNewPassword) => {
                  db.user.update({
                    fullname: req.body.fullname,
                    address: req.body.adress,
                    password: hashedNewPassword,
                    phoneNumber:req.body.phoneNumber
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
                address: req.body.adress,
                phoneNumber:req.body.phoneNumber
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
 


// method
}