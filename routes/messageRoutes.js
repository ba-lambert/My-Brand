const router = require ("express").Router()
const {newMessage,getAllQuerries} = require("../controllers/userControler")
router.post("/",newMessage);
router.get("/querie",getAllQuerries);
module.exports = router