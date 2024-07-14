

  
module.exports=(sequelize,DataTypes)=>{
    const notification=sequelize.define("notification",{
        content: {
            type: DataTypes.STRING,
            allowNull: true,
          },
        isSeen: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
    })
 return  notification
}