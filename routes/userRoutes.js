const router = require("express").Router()
const {registerUser,signIn} = require("../controllers/authController")
router.post("/register",registerUser);
router.post("/signin",signIn);
module.exports = router