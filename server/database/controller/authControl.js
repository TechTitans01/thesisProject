const db = require("../sequelize/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { nodeMailer } = require("../../lib/nodeMailer");
require('dotenv').config();


function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit code
  }
module.exports = {
    signup: async (req, res) => {
        const {  email, password, username } = req.body;
        try {
            // hashing the password
            const hashedPassword = await bcrypt.hash(password, 10);
            // storing the hashed password in the database
            const newUser = await db.user.create({
                //LOL
                email,
                password: hashedPassword,
                username
            });
            
            // generate a JWT token
            const token = jwt.sign(
                {
                    id: newUser.id,
                    email: newUser.email,
                },
                process.env.JWT_SECRET,
            );

            res.status(201).json({ newUser, token });
        } catch (err) {
            res.status(500).json({ err: err.message });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            // if the email or password is incorrect we provide an error message
            if (!email || !password) {
                return res.status(400).json({ message: "Please provide email and password" });
            }

            // if both email and password are valid we login
            let user = await db.user.findOne({
                where: { email: email }
            });
            let admin = await db.admin.findOne({
                where: { email: email }
            });
            if (!user) {
                const check = await bcrypt.compare(password, admin.password);
                if (!check) {
                    return res.status(401).json({ error: "Wrong password" });
                }
    
                // generate a JWT token
                const token = jwt.sign(
                    {
                        id: admin.id,
                        email: admin.email,
                    },
                    process.env.JWT_SECRET,
                    
                );
    
               console.log(token);
               return  res.json({ token,admin });
              
            }

            // compare the provided password with the stored hashed password
            const check = await bcrypt.compare(password, user.password);
            if (!check) {
                return res.status(401).json({ error: "Wrong password" });
            }

            // generate a JWT token
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                },
                process.env.JWT_SECRET,
                
            );

           
            res.json({ token,user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    sendMail: async (req, res) => {
        const code = generateVerificationCode();
        try {
          await nodeMailer(req.body.to,req.body.subject,`<b><h3>Your verification code is:<h3><br/><h1> ${code}<h1></b>`);
          res.send( "mail sent/"+code);
        } catch (err) {
          res.status(500).send("Failed to send email");
        }
      }
};


