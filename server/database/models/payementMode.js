module.exports=(sequelize,DataTypes)=>{
    const payment=sequelize.define("payment",{
        amount: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
    })
 return  payment
}