const router = require("express").Router();
const {
  userRegister,
  userLogin,
  userAuth,
  serializeUser,
  checkRole,
} = require("../utils/Auth");

//Users Registration Route
router.post("/register-user", async (req, res) => {
  await userRegister(req.body, "user", res);
});
//Admin Registration Route
router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});
//Users Login Route
router.post("/login-user", async (req, res) => {
  await userLogin(req.body, "user", res);
});
//Admin Login Route
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});
//Profile Route
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});
//User Protected Route
router.post(
  "/user-protected",
  userAuth,
  checkRole(["user"]),
  async (req, res) => {
    return res.json("Hello User");
  }
);
//Admin Protected Route
router.post(
  "/admin-protected",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    return res.json("Hello Admin");
  }
);
module.exports = router;
