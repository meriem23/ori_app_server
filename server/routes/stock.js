const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Stock = require("../models/Stock");
const { userAuth } = require("../utils/Auth");

/* Private Routes */

//Get stock
router.get("/", (req, res) => {
  Stock.find()
    .populate("ingredient")
    .populate("supplier")
    .sort({ date: -1 })
    .then((stock) => res.status(201).send(stock))
    .catch((err) =>
      res.status(400).json({
        message: "Can't get the list of stock",
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
      body("quantity", "Quantity is required").notEmpty(),
      body("price", "Price is required").notEmpty(),
      body("ingredient", "Ingredient is required").notEmpty(),
      body("supplier", "Supplier is required").notEmpty(),
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
    const { quantity, price, ingredient, supplier } = req.body;
    const newStock = new Stock({
      quantity,
      price,
      ingredient,
      supplier,
      user: req.user.id,
    });
    newStock
      .save()
      .then((stock) => res.status(201).send(stock))
      .catch((err) =>
        res.status(500).json({
          message: "Can't create this stock",
          success: false,
        })
      );
  }
);
//Delete a stock element
router.delete("/:id", (req, res) => {
  Stock.findById(req.params.id)
    .then((stock) => {
      if (!stock) {
        return res.status(404).json({ msg: "Stock not found" });
      } else {
        Stock.findByIdAndDelete(req.params.id, (err, data) => {
          res.json({ msg: "Stock deleted" });
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
//Put an stock
router.put("/:id", userAuth, (req, res) => {
  const { quantity, price, ingredient, supplier } = req.body;
  let stockField = {};
  if (quantity) stockField.quantity = quantity;
  if (price) stockField.price = price;
  if (ingredient) stockField.ingredient = ingredient;
  if (supplier) stockField.supplier = supplier;
  Stock.findById(req.params.id).then((stock) => {
    if (!stock) {
      return res.status(404).json({ msg: "Stock not found" });
    } else if (stock.user.toString() !== req.user.id) {
      res.status(401).json({
        message: "Not authorized",
        success: false,
      });
    } else {
      Stock.findByIdAndUpdate(
        req.params.id,
        { $set: stockField },
        { new: true },
        (err, data) => {
          res.status(200).json({
            message: "Stock information updated",
            success: true,
          });
        }
      );
    }
  });
});
module.exports = router;
