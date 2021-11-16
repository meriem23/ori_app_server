const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Shape = require("../models/Shape");
const { userAuth } = require("../utils/Auth");

/* Private Routes */

//Get list of shapes
router.get("/", (req, res) => {
  Shape.find()
    .sort({ date: -1 })
    .then((shapes) => res.status(201).send(shapes))
    .catch((err) =>
      res.status(400).json({
        message: "Can't get the list of shapes",
        success: false,
      })
    );
});

//Post a shape
router.post(
  "/",
  [userAuth, [body("name", "Shape Name is required").notEmpty()]],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Name can't be empty",
        success: false,
      });
    }
    const { name, description } = req.body;
    const newShape = new Shape({
      name,
      description,
      user: req.user.id,
    });
    newShape
      .save()
      .then((shape) => res.status(201).send(shape))
      .catch((err) =>
        res.status(500).json({
          message: "Can't create this shape",
          success: false,
        })
      );
  }
);
//Delete a shape
router.delete("/:id", (req, res) => {
  Shape.findById(req.params.id)
    .then((shape) => {
      if (!shape) {
        return res.status(404).json({ msg: "Shape not found" });
      } else {
        Shape.findByIdAndDelete(req.params.id, (err, data) => {
          res.json({ msg: "Shape deleted" });
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
//Put a shape
router.put("/:id", userAuth, (req, res) => {
  const { name, description } = req.body;
  let shapeField = {};
  if (name) shapeField.name = name;
  if (description) shapeField.description = description;

  Shape.findById(req.params.id).then((shape) => {
    if (!shape) {
      return res.status(404).json({ msg: "Shape not found" });
    } else if (shape.user.toString() !== req.user.id) {
      res.status(401).json({
        message: "Not authorized",
        success: false,
      });
    } else {
      Shape.findByIdAndUpdate(
        req.params.id,
        { $set: shapeField },
        { new: true },
        (err, data) => {
          res.status(200).json({
            message: "Shape information updated",
            success: true,
          });
        }
      );
    }
  });
});
module.exports = router;
