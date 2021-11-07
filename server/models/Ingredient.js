const { Schema, model } = require("mongoose");

const IngredientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    components: [
      {
        compName: String,
        compValue: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("ingredient", IngredientSchema);
