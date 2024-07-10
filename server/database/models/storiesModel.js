module.exports=(sequelize,DataTypes)=>{
    const stories=sequelize.define("stories",{
        text: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          image: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          userName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          userImage: {
            type: DataTypes.STRING,
            allowNull: false,
          },       
    })          
 return  stories
}