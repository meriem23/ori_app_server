const mongoose = require("mongoose");

const IngredientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fact: [
      {
        fact__label: {
          type: String,
          required: true,
        },
        fact__quantity: {
          type: String,
          required: true,
        },
      },
    ],
    family: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "family",
      required: true,
    },
    shape: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shape",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ingredient", IngredientSchema);
