const db = require("../sequelize/index")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = {
    signin:async(req,res)=>{
        const {fullname,email,password,username} = req.body;
        try{
            //hashing the password
            const hashedPassword=await bycrypt(password);
            // storing the hashed pass word in the database
            const newUser = await db.user.create({
                fullname,
                email,
                password:  hashedPassword,
                username
            });
            res.sttatus(201).json(newUser);
        } catch(err){
            res.status(500).json({err: err.message});
        }
    },


    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            // ifthe email or the password is incorrect we provide an error message
            if (!email || !password) {
                return res.status(400).json({ message: "Please provide email and password" });
            }
    
            // if both  email and pass are valide we login 
            let user = await db.user.findOne({
                where: { email: email }
            });
    
            // if user does not exist
            const check = await bcrypt.compare(password, user.password);
            if (!check) {
              return res.status(401).json({ error: "wrong password" });
            }
            let role;
            if (user instanceof db.admin) {
                role = "admin";
              } else if (user instanceof db.user) {
                role = "user";
        }
        const token=jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: role
                
            }
        )
        res.json({token})
    }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
          }
    }
    



















}