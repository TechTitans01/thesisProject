const db=require("../sequelize/index.js")
module.exports={
    getHotels: async (req, res) => {
        try {
          const data = await db.hotel.findAll();
          res.send(data);
        } catch (err) {
          res.status(500).send(err);
        }
      },
      addHotel: async (req, res) => {
        try {
          const data = await db.hotel.create(req.body);
          res.send(data);
        } catch (err) {
          res.status(500).send(err);
        }
      },
      getOneHotel: async (req, res)=> {
        try {
          const data = await db.hotel.findAll({ where: { destinationId: req.params.id } });
          res.send(data);
        } catch (err) {
          res.status(500).send(err);
        }
      },
      deleteHotel: async (req, res) => {
        try {
          const data = await db.hotel.destroy({ where: { id: req.params.id } });
          res.send("deleted");
        } catch (err) {
          res.status(500).send(err);
        }
      },
      
      updateHotel: async (req, res) => {
        try {
          const data = await db.hotel.update(req.body, { where: { id: req.params.id } });
          res.send(data);
        } catch (err) {
          res.status(500).send(err);
        }
      },
      

}