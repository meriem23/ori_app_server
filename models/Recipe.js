const mongoose = require("mongoose");

const RecipeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category'
    },
    ingredients: [
      {
        shape: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "shape",
          required: true,
        },
        ingredient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ingredient",
          required: true,
        },
        quantity: {
          type: String,
          required: true,
        },
      },
    ],
    instructions: [
      {
        title: {
          type: String,
          required: false,
        },
        instruction: {
          type: String,
          required: true,
        },
        temperature: {
          type: String,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("recipe", RecipeSchema);
