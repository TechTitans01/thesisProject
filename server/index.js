const express = require("express");
const cors = require("cors");
require("../server/database/sequelize/index.js")
const routeruser=require("./database/routes/userRoutes.js")
const bookingRoutes = require('./database/routes/bookingRoutes.js');
const reviewRoutes = require('./database/routes/reviewRoutes.js');
const roomRoutes = require('./database/routes/roomRoutes.js')
const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user",routeruser)
app.use('/bookings', bookingRoutes);
app.use('/commentaires', reviewRoutes);
app.use('/rooms', roomRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
