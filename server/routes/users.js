const router = require("express").Router();
const { userRegister } = require("../utils/Auth");

//Users Registration Route
router.post("/register-user", async (req, res) => {
  await userRegister(req.body, "user", res);
});
//Admin Registration Route
router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});
//Users Login Route
router.post("/login-user", async (req, res) => {});
//Admin Login Route
router.post("/login-admin", async (req, res) => {});
//Profile Route
router.get("/profile", async (req, res) => {});
//User Protected Route
router.post("/user-protected", async (req, res) => {});
//Admin Protected Route
router.post("/admin-protected", async (req, res) => {});
module.exports = router;
