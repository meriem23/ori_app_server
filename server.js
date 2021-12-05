//require constants
const express = require("express");
const cors = require("cors");
const { PORT } = require("./config");
const { success, error } = require("consola");
const connectDB = require("./config/connectDB");
const passport = require("passport");
//Initial App
const app = express();

//Connecting DB
connectDB();

// Body Parser & cors
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

require("./middlewares/passport")(passport);
//User Router middleware
app.use("/api/users", require("./routes/users"));
app.use("/api/family", require("./routes/family"));
app.use("/api/shape", require("./routes/shape"));
app.use("/api/ingredient", require("./routes/ingredient"));
app.use("/api/recipe", require("./routes/recipe"));
app.use("/api/supplier", require("./routes/supplier"));
app.use("/api/stocks", require("./routes/stock"));

//Creating Server
app.listen(PORT, () =>
  success({
    message: `Server up and running on port ${PORT} 👍`,
    badge: true,
  })
);
