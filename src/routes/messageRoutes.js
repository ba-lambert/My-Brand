import {Router} from "express"
import validate from "../middleware/validation.js";
import passport from "passport";
const router=Router()
import { newMessage, getAllQuerries, deleteMessage } from "../controllers/userControler.js";
import {isLoggedIn} from "../middleware/isLogedin.js";
import { commentSchema,blog_schema } from "../validations/validation.js";
// router.use(verifyToken)
router.use(passport.initialize());
router.use(passport.session());
router.post("/messages",passport.authenticate('jwt',{session:false}),validate(commentSchema),newMessage);
router.get("/messages",passport.authenticate('jwt',{session:false}),getAllQuerries);
router.delete("/messages/:id",passport.authenticate('jwt',{session:false}),deleteMessage);
export default router