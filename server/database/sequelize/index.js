// const config = require("./config.js");
const { Sequelize, DataTypes } = require("sequelize");

// create a database sequelize in your application using a Sequelize instance and the config file
const sequelize = (
  "travell",
  "root",
  "root",
  {
    host: "localhost",
    dialect: "mysql",
  }
);
const db={}
db.user=require("../models/userModels.js")(sequelize,DataTypes)
db.booking=require("../models/BookingModel.js")(sequelize,DataTypes)
db.room=require("../models/roomModels.js")(sequelize,DataTypes)
db.hotel=require("../models/hotelsModel.js")(sequelize,DataTypes)
db.payment=require("../models/payementMode.js")(sequelize,DataTypes)
db.notification=require("../models/notificationMode.js")(sequelize,DataTypes)
db.messages=require("../models/messagesModel.js")(sequelize,DataTypes)
db.destination=require("../models/destinationModel.js")(sequelize,DataTypes)
db.admin=require("../models/adminModel.js")(sequelize,DataTypes)
db.commentaire=require("../models/commentaireModel.js")(sequelize,DataTypes)


db.notification.belongsTo(db.user);
db.user.hasMany(db.notification);

db.notification.belongsTo(db.admin);
db.admin.hasMany(db.notification);

db.payment.belongsTo(db.user);
db.user.hasMany(db.payment);
db.payment.belongsTo(db.booking);
db.booking.hasMany(db.payment);


db.messages.belongsTo(db.user);
db.user.hasMany(db.messages);

db.booking.belongsTo(db.user);
db.user.hasMany(db.booking);


db.booking.belongsTo(db.room);
db.room.hasMany(db.booking);




db.commentaire.belongsTo(db.user);
db.user.hasMany(db.commentaire);

db.commentaire.belongsTo(db.room);
db.room.hasMany(db.commentaire);

db.room.belongsTo(db.hotel);
db.hotel.hasMany(db.room);

db.hotel.belongsTo(db.destination);
db.destination.hasMany(db.hotel);


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