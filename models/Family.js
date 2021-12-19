const mongoose = require("mongoose");
const FamSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    shapes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shape",
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

module.exports = mongoose.model("family", FamSchema);
