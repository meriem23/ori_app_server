const { Schema, model } = require("mongoose");

const FamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("families", FamSchema);
