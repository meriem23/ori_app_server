const mongoose = require("mongoose");
const FamSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    ingredient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ingredient",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("family", FamSchema);
