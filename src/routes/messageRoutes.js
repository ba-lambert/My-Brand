import {Router} from "express"
const router=Router()
import { newMessage, getAllQuerries } from "../controllers/userControler.js";
router.post("/new",newMessage);
router.get("/querie",getAllQuerries);
export default router