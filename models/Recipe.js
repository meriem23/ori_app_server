const mongoose = require("mongoose");

const RecipeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        ingredient__shape: {
          type: String,
          required: true,
        },
        ingredient__label: {
          type: String,
          required: true,
        },
        ingredient__quantity: {
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
