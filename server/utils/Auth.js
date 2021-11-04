const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const passport = require("passport");
const { SECRET } = require("../config");

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

const userLogin = async (userCreds, role, res) => {
  let { email, password } = userCreds;
  // check the email is in the DB
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "Email not registred in the database",
      success: false,
    });
  }
  // check the role
  if (user.role !== role) {
    return res.status(404).json({
      message: "You are not an authorized user",
      success: false,
    });
  }
  // check the password is right
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    //Sign in the token and issue it to the user
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        email: user.email,
      },
      SECRET,
      { expiresIn: "7 days" }
    );
    let result = {
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };
    return res.status(200).json({
      ...result,
      message: "You are now logged in",
      success: true,
    });
  } else {
    return res.status(404).json({
      message: "Incorrect password",
      success: false,
    });
  }
};

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

// passport middleware
const userAuth = passport.authenticate("jwt", { session: false });

module.exports = {
  userRegister,
  userLogin,
  userAuth,
};
