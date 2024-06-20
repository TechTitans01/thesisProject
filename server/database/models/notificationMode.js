

  
module.exports=(sequelize,DataTypes)=>{
    const notification=sequelize.define("notification",{
        content: {
            type: DataTypes.STRING,
            allowNull: true,
          },
    })
 return  notification
}