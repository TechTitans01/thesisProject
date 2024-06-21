

module.exports=(sequelize,DataTypes)=>{
    const user=sequelize.define("user",{
        fullname: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          address: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          username: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          cardNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          CIN: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },



    })
 return  user
}