const bcrypt = require("bcryptjs");
const User = require("../models/User");

//Regester user function ( admin , user)

const userRegister = async (userDets, role, res) => {
  try {
    //validate the email
    let useremailRegisterd = await validateEmail(userDets.email);
    if (!useremailRegisterd) {
      return res.status(400).json({
        message: "This email is already registerd",
        success: false,
      });
    }
    // Get the hashed password
    const password = await bcrypt.hash(userDets.password, 12);
    // Create a new user
    const newUser = new User({
      ...userDets,
      password,
      role,
    });
    await newUser.save();
    return res.status(201).json({
      message: "New user successfully created, now you can login",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable to create new user, please try again",
      success: false,
    });
  }
};

const validateEmail = async (email) => {
  let user = User.findOne({ email });
  return user ? false : true;
};

module.exports = {
  userRegister,
};
