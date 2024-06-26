const db=require("../../sequelize/index.js")
const stripe = require('./stripe.js');
module.exports={
   payments: async (req, res)=>{
        try {
          const { amount, userId, bookingId,email,country,nameCard } = req.body;
      
          // Create a new payment intent with the specified amount and currency
          const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
          });
      
          // Save the payment intent ID in your database (optional)
          const payment = await db.payment.create({
            amount,
            stripePaymentIntentId: paymentIntent.id,
            userId,
            bookingId,
            email,
            country,
            nameCard,
          });
      
          // Send the client secret to the client
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