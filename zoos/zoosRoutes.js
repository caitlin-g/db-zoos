const express = require("express");

const zoos = require("./zoosModel.js");

const router = express.Router();

//=============== ZOO ENDPOINTS =============== //

// get a list of zoos
router.get("/", (req, res) => {
  zoos
    .find()
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

// get a zoo by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const zoo = await zoos.findById(id);

    if (zoo) {
      res.status(200).json(zoo);
    } else {
      res.status(404).json({ message: "Zoo not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// create a zoo
router.post("/", (req, res) => {
  const { name } = req.body;
  const zoo = { name };

  if (!name) {
    return res
      .status(400)
      .json({ error: "Please provide a name for your zoo." });
  }
  zoos
    .add(zoo)
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// update zoo
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  zoos
    .update(id, changes)
    .then(zoo => {
      if (!zoo || zoo < 1) {
        res.status(404).json({ message: "No zoo found to update" });
      } else {
        res.status(200).json(zoo);
      }
    })
    .catch(err => res.status(500).json(err));
});

// delete a zoo
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  zoos
    .remove(id)
    .then(zoo => {
      if (!zoo || zoo < 1) {
        res.status(404).json({ message: "No zoos found to delete" });
      } else {
        res.status(200).json(zoo);
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
