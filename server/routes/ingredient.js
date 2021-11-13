const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Ingredient = require("../models/Ingredient");
const { userAuth } = require("../utils/Auth");

/* Private Routes */

//Get list of ingredients
router.get("/", (req, res) => {
  Ingredient.find()
    .sort({ date: -1 })
    .then((ingredients) => res.status(201).send(ingredients))
    .catch((err) =>
      res.status(400).json({
        message: "Can't get the list of ingredients",
        success: false,
      })
    );
});

//Post an ingredient
router.post(
  "/",
  [
    userAuth,
    [
      body("name", "Ingredient Name is required").notEmpty(),
      body("familyType", "Family type is required").notEmpty(),
      body("shapeType", "Shape type is required").notEmpty(),
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "You have to fill out all the informations",
        success: false,
      });
    }
    const { name, family, shape, components } = req.body;
    const newIngredient = new Ingredient({
      name,
      familyType,
      shapeType,
      //components,
      user: req.user.id,
    });
    newIngredient
      .save()
      .then((ingredient) => res.status(201).send(ingredient))
      .catch((err) =>
        res.status(500).json({
          message: "Can't create this ingredient",
          success: false,
        })
      );
  }
);
//Delete an ingredient
router.delete("/:id", (req, res) => {
  Ingredient.findById(req.params.id)
    .then((ingredient) => {
      if (!ingredient) {
        return res.status(404).json({ msg: "Ingredient not found" });
      } else {
        Family.findByIdAndDelete(req.params.id, (err, data) => {
          res.json({ msg: "Ingredient deleted" });
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
//Put an ingredient
router.put("/:id", userAuth, (req, res) => {
  const { name, family, shape, components } = req.body;
  let ingredientField = {};
  if (name) ingredientField.name = name;
  if (family) ingredientField.familyType = familyType;
  if (shape) ingredientField.shapeType = shapeType;
  if (components) ingredientField.components = components;
  Ingredient.findById(req.params.id).then((ingredient) => {
    if (!ingredient) {
      return res.status(404).json({ msg: "Ingredient not found" });
    } else if (ingredient.user.toString() !== req.user.id) {
      res.status(401).json({
        message: "Not authorized",
        success: false,
      });
    } else {
      Ingredient.findByIdAndUpdate(
        req.params.id,
        { $set: ingredientField },
        { new: true },
        (err, data) => {
          res.status(200).json({
            message: "Ingredient information updated",
            success: true,
          });
        }
      );
    }
  });
});
module.exports = router;
