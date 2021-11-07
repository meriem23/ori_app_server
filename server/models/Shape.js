const { Schema, model } = require("mongoose");

const ShapeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("shape", ShapeSchema);
