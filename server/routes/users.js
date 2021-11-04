const router = require("express").Router();
const { userRegister, userLogin, userAuth } = require("../utils/Auth");

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
  console.log(req);
  return res.json("Hello");
});
//User Protected Route
router.post("/user-protected", userAuth, async (req, res) => {});
//Admin Protected Route
router.post("/admin-protected", userAuth, async (req, res) => {});
module.exports = router;
