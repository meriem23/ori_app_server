const { Schema, model } = require("mongoose");

const ingredientStockSchema = new Schema(
  {
    idSupplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supplier",
      required: true,
    },
    idIngredient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ingredient",
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("ingredientStock", ingredientStockSchema);
