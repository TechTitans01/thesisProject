module.exports=(sequelize,DataTypes)=>{
    const reclamation=sequelize.define("reclamation",{
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          firstName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          lastName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          
          
          
    
    })
 return  reclamation
}