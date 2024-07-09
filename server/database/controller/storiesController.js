const db=require("../sequelize/index.js")
module.exports ={
    getStories: async (req, res) => {{
        try {
          const data = await db.stories.findAll();
          res.send(data);
        } catch (err) {
          res.status(500).send(err);
        }
      }},
       addStory: async (req, res) => {{
        try {
            const data = await db.stories.create(req.body);
            res.send(data);
          } catch (err) {
            res.status(500).send(err);
          }
        }},
        removeStory: async (req, res) => {
            try {
              const data = await db.stories.destroy({ where: { id: req.params.id } });
              res.send(data);
            } catch (err) {
              res.status(500).send(err);
            }
          },
          getOneStory: async (req, res) => {
            try {
              const data = await db.stories.findOne({ where: { id: req.params.id } });
              res.send(data);
            } catch (err) {
              res.status(500).send(err);
            }
          },
          updateStory: async (req, res) => {
            try {
              const data = await db.stories.update(req.body, { where: { id: req.params.id } });
              res.send(data);
            } catch (err) {
              res.status(500).send(err);
            }
          }
}

