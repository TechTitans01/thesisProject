module.exports=(sequelize,DataTypes)=>{
  const hotel=sequelize.define("hotel",{

      name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        bookings: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        stars: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        latitude: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        longitude: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        nightPrice: {
          type: DataTypes.INTEGER,
          allowNull: false,
        }

  })
return  hotel
}