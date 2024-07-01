require('dotenv').config();

const axios = require('axios');
const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
module.exports={
    
    sendSMS :(to, body) => {
        client.messages
          .create({
            body: body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to
          })
          .then(message => console.log('SMS sent with SID:', message.sid))
          .catch(error => console.error('Failed to send SMS:', error));
      }}