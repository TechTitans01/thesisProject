const db=require("../sequelize/index.js")
module.exports={
    getDestination: async (req, res) => {
        try {
          const data = await db.destination.findAll();
          res.send(data);
        } catch (err) {
          res.status(500).send(err);
        }
      },
      addDestination: async (req, res) => {
        try {
            const data = await db.destination.create(req.body);
            res.send(data);
          } catch (err) {
            res.status(500).send(err);
          }
        },
        updateDestination: async (req, res) => {
            try {
              const data = await db.destination.update(req.body, { where: { id: req.params.id } });
              res.send(data);
            } catch (err) {
              res.status(500).send(err);
            }
          },
          removeDestination: async (req, res) => {
            try {
              const data = await db.destination.destroy({ where: { id: req.params.id } });
              res.send(data);
            } catch (err) {
              res.status(500).send(err);
            }
          },
          getOneDestination: async (req, res) => {
            try {
              const data = await db.destination.findOne({ where: { id: req.params.id } });
              res.send(data);
            } catch (err) {
              res.status(500).send(err);
            }
          },
          getOneDestinationbyname: async (req, res) => {
            try {
              const data = await db.destination.findOne({ where: { name: req.params.name } });
              res.send(data);
            } catch (err) {
              res.status(500).send(err);
            }
          }
    }
