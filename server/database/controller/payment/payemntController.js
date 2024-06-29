const db=require("../../sequelize/index.js")
const stripe = require('./stripe.js');
module.exports={
   payments: async (req, res)=>{
        try {
          const { amount, userId, bookingId,email,country,nameCard } = req.body;
      
         
          
          const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
          });
      
         
          const payment = await db.payment.create({
            amount,
            stripePaymentIntentId: paymentIntent.id,
            userId,
            bookingId,
            email,
            country,
            nameCard,
          });
      
        
          res.send({
            clientSecret: paymentIntent.client_secret,
          });
        } catch (error) {
          res.status(400).send({
            error: {
              message: error.message,
            },
          });
        }
      }
}