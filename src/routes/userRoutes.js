import {Router} from "express"
import {registerUser,signIn} from "../controllers/authController.js"
const router =Router();
router.post("/register",registerUser);
router.post("/signin",signIn);
export default router