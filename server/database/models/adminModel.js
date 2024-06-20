

module.exports=(sequelize,DataTypes)=>{
    const admin=sequelize.define("admin",{
        email: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
     


    })
 return  admin
}