const { Schema, model } = require("mongoose");

const IngredientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("ingredients", IngredientSchema);
