

module.exports=(sequelize,DataTypes)=>{
    const commentaire=sequelize.define("commentaire",{
     
        text: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          date: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          image: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: true,
          },

    })
 return  commentaire
}