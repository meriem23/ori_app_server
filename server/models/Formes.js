const { Schema, model } = require("mongoose");

const FormesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("formes", FormeSchema);
