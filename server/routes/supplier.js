const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Supplier = require("../models/Supplier");

/* Private Routes */

//Get list of suppliers
router.get("/", (req, res) => {
  Supplier.find()
    .sort({ date: -1 })
    .then((suppliers) => res.status(201).send(suppliers))
    .catch((err) =>
      res.status(400).json({
        message: "Can't get the list of suppliers",
        success: false,
      })
    );
});

//Post a supplier
router.post(
  "/",
  [
    body("name", "Supplier Name is required").notEmpty(),
    body("address", "Supplier Address is required").notEmpty(),
    body("phone", "Supplier Phone is required").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Information can't be empty",
        success: false,
      });
    }
    const { name, address, phone } = req.body;
    const newSupplier = new Supplier({
      name,
      address,
      phone,
    });
    newSupplier
      .save()
      .then((supplier) => res.status(201).send(supplier))
      .catch((err) =>
        res.status(500).json({
          message: "Can't create this supplier",
          success: false,
        })
      );
  }
);
//Delete a supplier
router.delete("/:id", (req, res) => {
  Supplier.findById(req.params.id)
    .then((supplier) => {
      if (!supplier) {
        return res.status(404).json({ msg: "Supplier not found" });
      } else {
        Supplier.findByIdAndDelete(req.params.id, (err, data) => {
          res.json({ msg: "Supplier deleted" });
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
//Put a supplier
router.put("/:id", (req, res) => {
  const { name, address, phone } = req.body;
  let supplierField = {};
  if (name) supplierField.name = name;
  if (address) supplierField.description = address;
  if (phone) supplierField.phone = phone;
  Supplier.findById(req.params.id).then((supplier) => {
    if (!supplier) {
      return res.status(404).json({ msg: "Supplier not found" });
    } else {
      Supplier.findByIdAndUpdate(
        req.params.id,
        { $set: supplierField },
        { new: true },
        (err, data) => {
          res.status(200).json({
            message: "Supplier information updated",
            success: true,
          });
        }
      );
    }
  });
});
module.exports = router;
