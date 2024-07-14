const router = require("express").Router();
const User = require("../models/User.model");

router.get("/:userId", (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.put("/:userId", (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        if (req.body.name != null) {
          user.name = req.body.name;
        }
        // if (req.body.email != null) {
        //   user.email = req.body.email;
        // }
        // if (req.body.password != null) {
        //   user.password = req.body.password;
        //}
        if (req.body.profileImg != null) {
          user.profileImg = req.body.profileImg;
        }

        user
          .save()
          .then((updatedUser) => {
            res.json(updatedUser);
          })
          .catch((error) => {
            res.status(400).json({ message: error.message });
          });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});
module.exports = router;
