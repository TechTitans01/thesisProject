
module.exports=(sequelize,DataTypes)=>{
    const messages=sequelize.define("messages",{
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
        
    
    })
 return  messages
}