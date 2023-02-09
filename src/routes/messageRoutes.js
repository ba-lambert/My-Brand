import {Router} from "express"
import blog_schema from "../validations/validation.js";
import validate from "../middleware/validation.js";
import passport from "passport";
const router=Router()
import { newMessage, getAllQuerries } from "../controllers/userControler.js";
import {isLoggedIn} from "../middleware/isLogedin.js";
// router.use(verifyToken)
router.use(passport.initialize());
router.use(passport.session());
router.post("/messages",isLoggedIn,validate(blog_schema),newMessage);
router.get("/messages",isLoggedIn,getAllQuerries);
export default router