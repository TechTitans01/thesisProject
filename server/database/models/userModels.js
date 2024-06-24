

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
            unique: true,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
          },
          image: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          cardNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: true,
          },
          CIN: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: true,
          },
          birthday:{
            type: DataTypes.STRING,
            allowNull: true,
          },
          gender:{
            type: DataTypes.STRING,
            allowNull: true,
          }



    })
 return  user
}