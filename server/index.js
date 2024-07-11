const express = require("express");
const db = require("../server/database/sequelize/index.js");
const cors = require("cors");
const routeruser = require("./database/routes/userRoutes.js");
const routerhotel = require("./database/routes/hotelsRoutes.js");
const authRoutes = require("./database/routes/authRout.js");
const bookingRoutes = require('./database/routes/bookingRoutes.js');
const reviewRoutes = require('./database/routes/reviewRoutes.js');
const roomRoutes = require('./database/routes/roomRoutes.js');
const reclamationRoutes = require('./database/routes/reclamtion.js');
const adminRoutes = require('./database/routes/adminRt.js');
const messagesRouter = require("./database/routes/messageRoute.js");
const destinationRoutes = require('./database/routes/destinationRoutes.js');
const paymentRouter = require('./database/routes/paymentRoute.js');
const notificationRoutes = require('./database/routes/notificationRoutes.js'); 
const { sendSMS } = require('./database/controller/sms.js');

const PORT = 8080;
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

app.use(express.json());
app.use(cors());

app.use("/api/user", routeruser);
app.use("/api/hotels", routerhotel);
app.use("/api/auth", authRoutes);
app.use('/bookings', bookingRoutes);
app.use('/commentaires', reviewRoutes);
app.use('/rooms', roomRoutes);
app.use('/api/destination', destinationRoutes);
app.use('/api/reclamation', reclamationRoutes);
app.use('/api/payments', paymentRouter);
app.use('/api/chat', messagesRouter);
app.use('/api/admin', adminRoutes);
app.use('/notifications', notificationRoutes); 

app.post('/send-sms', (req, res) => {
  const { to, text } = req.body;
  sendSMS(to, text);
  res.json({ success: true, message: 'SMS request received' });
});

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});


io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle sendMessage event
  socket.on('sendMessage', async (messageData) => {
    try {
      const message = await db.messages.create({
        content: messageData.content,
        senderId: messageData.senderId,
        receiverId: messageData.receiverId,
      });

      io.to(messageData.senderId).emit('newMessage', message);
      io.to(messageData.receiverId).emit('newMessage', message);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  // Handle sendNotification event
  socket.on('sendNotification', async (notificationData) => {
    try {
      const notification = await db.notification.create({
        content: notificationData.content,
        userId: notificationData.userId,
        adminId: notificationData.adminId,
        isSeen: notificationData.isSeen
       });

      io.to(notificationData.userId).emit('newNotification', notification);
      io.to(notificationData.adminId).emit('newNotification', notification);
    } catch (error) {
      console.error('Error saving notification:', error);
    }
  });

  socket.on('joinRoom', (userId) => {
    socket.join(userId);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
