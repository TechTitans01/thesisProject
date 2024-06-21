module.exports=(sequelize,DataTypes)=>{
    const booking=sequelize.define("booking",{
        start: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          end: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          guests: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          status: {
            type: DataTypes.ENUM('pending', 'confirmed', 'canceled'),
            allowNull: false,
          },             
    })          
 return  booking
}