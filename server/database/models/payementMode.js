module.exports=(sequelize,DataTypes)=>{
    const payment=sequelize.define("payment",{
        amount: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          stripePaymentIntentId: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: true,},

            country: {
              type: DataTypes.STRING,
              allowNull: true,},
              nameCard: {
                type: DataTypes.STRING,
                allowNull: true,},
              
    },)
 return  payment
}