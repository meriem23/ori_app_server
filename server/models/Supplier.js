const { Schema, model } = require("mongoose");

const SupplierSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("suppliers", SupplierSchema);
