//require constants
const express = require("express");
const cors = require("cors");
const { PORT } = require("./config");
const { success, error } = require("consola");
const connectDB = require("./config/connectDB");

//Initial App
const app = express();

//Connecting DB
connectDB();

// Body Parser & cors
app.use(express.json());
app.use(cors());

//User Router middleware
app.use("/api/users", require("./routes/users"));

//Creating Server
app.listen(PORT, () =>
  success({
    message: `Server up and running on port ${PORT} 👍`,
    badge: true,
  })
);
