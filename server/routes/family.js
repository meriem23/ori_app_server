const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Family = require("../models/Family");
const { userAuth } = require("../utils/Auth");

/* Private Routes */

//Get list of families
router.get("/", userAuth, (req, res) => {
  Family.find({ user: req.user.id })
    .sort({ date: -1 })
    .then((families) => res.status(201).send(families))
    .catch((err) =>
      res.status(400).json({
        message: "Can't get the list of families",
        success: false,
      })
    );
});

//Post a family
router.post(
  "/",
  [userAuth, [body("name", "Family Name is required").notEmpty()]],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Name can't be empty",
        success: false,
      });
    }
    const { name, description } = req.body;
    const newFamily = new Family({
      name,
      description,
      user: req.user.id,
    });
    newFamily
      .save()
      .then((family) => res.status(201).send(family))
      .catch((err) =>
        res.status(500).json({
          message: "Can't create this family",
          success: false,
        })
      );
  }
);
//Delete a family
router.delete("/:id", (req, res) => {
  Family.findById(req.params.id)
    .then((family) => {
      if (!family) {
        return res.status(404).json({ msg: "Family not found" });
      } else if (family.user.toString() !== req.user.id) {
        res.status(401).json({
          message: "Not authorized",
          success: false,
        });
      } else {
        Family.findByIdAndDelete(req.params.id, (err, data) => {
          res.json({ msg: "Family deleted" });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Server error",
        success: false,
      });
    });
});
//Put a family
router.put("/:id", userAuth, (req, res) => {
  const { name, description } = req.body;
  let familyField = {};
  if (name) familyField.name = name;
  if (description) familyField.description = description;

  Family.findById(req.params.id).then((family) => {
    if (!family) {
      return res.status(404).json({ msg: "Family not found" });
    } else if (family.user.toString() !== req.user.id) {
      res.status(401).json({
        message: "Not authorized",
        success: false,
      });
    } else {
      Family.findByIdAndUpdate(
        req.params.id,
        { $set: familyField },
        { new: true },
        (err, data) => {
          res.status(200).json({
            message: "Family information updated",
            success: true,
          });
        }
      );
    }
  });
});
module.exports = router;
