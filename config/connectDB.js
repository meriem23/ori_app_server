const mongoose = require("mongoose");
const { success, error } = require("consola");
require("dotenv").config({ path: "./.env" });

const URL = process.env.APP_DB;

const connectDB = () => {
  mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() =>
      success({
        message: `DB is connected 🎮`,
        badge: true,
      })
    )
    .catch((err) =>
      error({
        message: `DB is unable to connect 😔`,
        badge: true,
      })
    );
};

module.exports = connectDB;
