// const config = require("./config.js");
const { Sequelize, DataTypes } = require("sequelize");

const createAdmin=require('../../createAdmin.js')
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
db.reclamation=require("../models/reclamation.js")(sequelize,DataTypes)
db.stories=require("../models/storiesModel.js")(sequelize,DataTypes)


db.reclamation.belongsTo(db.user);
db.user.hasMany(db.reclamation);

db.notification.belongsTo(db.user);
db.user.hasMany(db.notification);

db.notification.belongsTo(db.admin);
db.admin.hasMany(db.notification);

db.payment.belongsTo(db.user);
db.user.hasMany(db.payment);
db.payment.belongsTo(db.booking);
db.booking.hasMany(db.payment);


db.user.hasMany(db.messages, { foreignKey: 'senderId', as: 'sentMessages' });
db.user.hasMany(db.messages, { foreignKey: 'receiverId', as: 'receivedMessages' });
db.messages.belongsTo(db.user, { foreignKey: 'senderId', as: 'sender' });
db.messages.belongsTo(db.user, { foreignKey: 'receiverId', as: 'receiver' });

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

sequelize.authenticate().then(()=>{
  console.log("good")
}).catch((err)=>{console.log(err,"Unable to connected")})



// sequelize
//   .sync({ force: false }) 
//   .then(async () => {
//     console.log("Database synchronized successfully");
//     await createAdmin(db);
//   })
//   .catch((error) => {
//     console.error("Unable to synchronize the database:", error);
//   });


module.exports=db
