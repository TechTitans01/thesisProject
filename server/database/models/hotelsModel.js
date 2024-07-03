

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
            type: DataTypes.DECIMAL(10, 0),
            allowNull: true,
          },
          longitude: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: true,
          },
          type: {
            type: DataTypes.STRING,
            allowNull: false,
          }

    })
 return  hotel
}