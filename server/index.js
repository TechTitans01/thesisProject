const express = require("express");
const cors = require("cors");
require("../server/database/sequelize/index.js")
const routeruser=require("./database/routes/userRoutes.js")
const routerhotel = require("./database/routes/hotelsRoutes.js")
const authRoutes=require("./database/routes/authRout.js")
const bookingRoutes = require('./database/routes/bookingRoutes.js');
const reviewRoutes = require('./database/routes/reviewRoutes.js');
const roomRoutes = require('./database/routes/roomRoutes.js')
const reclamationRoutes = require('./database/routes/reclamtion.js')
const paymentRouter=require('./database/routes/paymentRoute.js')

const {sendSMS} = require('./database/controller/sms.js');
const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user",routeruser)

app.use("/api/hotels",routerhotel)

app.use("/api/auth", authRoutes);
app.use('/bookings', bookingRoutes);
app.use('/commentaires', reviewRoutes);
app.use('/rooms', roomRoutes);
app.use('/api/reclamation', reclamationRoutes);
app.use('/api/payments', paymentRouter);
// app.use("/api/sms",smsRouter)
app.post('/send-sms', (req, res) => {
  const { to, text } = req.body;

  sendSMS(to, text);

  res.json({ success: true, message: 'SMS request received' });
});

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
