

module.exports=(sequelize,DataTypes)=>{
    const destination=sequelize.define("destination",{
        
        name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          image: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          flag: {
            type: DataTypes.STRING,
            allowNull: false,
          },


    })
 return  destination
}