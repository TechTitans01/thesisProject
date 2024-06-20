// const config = require("./config.js");
const { Sequelize, DataTypes } = require("sequelize");

// create a database sequelize in your application using a Sequelize instance and the config file
const sequelize = new Sequelize(
  "travell",
  "root",
  "root",
  {
    host: "localhost",
    dialect: "mysql",
  }
);
const db={}

db.Sequelize=sequelize
//verify your sequelize here !
sequelize.authenticate().then(()=>{
  console.log("good")
}).catch((err)=>{console.log(err,"Unable to connected")})

//  create your table using sequilize
// const TableName = sequelize.define("phrases", {
 
// });

// this call, Sequelize will automatically perform an SQL query to the database and create a table, printing the message phrase table created successfully!.
// please run this below *****one time***** after creating your sequelize

// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log("phrase table created successfully!");
//   })
//   .catch((error) => {
//     console.error("Unable to create table : ", error);
//   });

// export your Model Phrase below

module.exports=db