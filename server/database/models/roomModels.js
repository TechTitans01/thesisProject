module.exports=(sequelize,DataTypes)=>{
    const room=sequelize.define("room",{
        description: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          guests: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          nightPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          bedroom: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          baths: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          beds: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          status: {
            type: DataTypes.TINYINT,
            allowNull: true,
          },
          image1: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          image2: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          image3: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          image4: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          image5: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          image3: {
            type: DataTypes.STRING,
            allowNull: false,
          }
    })
 return  room
}