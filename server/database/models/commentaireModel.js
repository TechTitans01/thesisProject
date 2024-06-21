

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

    })
 return  commentaire
}