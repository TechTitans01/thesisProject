const express = require("express");
const cors = require("cors");
require("../server/database/sequelize/index.js")
const routeruser=require("./database/routes/userRoutes.js")
const routerhotel = require("./database/routes/hotelsRoutes.js")
const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user",routeruser)

app.use("/api/hotels",routerhotel)


app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
