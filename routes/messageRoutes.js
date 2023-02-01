const router = require ("express").Router()
const {newMessage,getAllQuerries} = require("../controllers/userControler")
router.post("/new",newMessage);
router.get("/querie",getAllQuerries);
module.exports = router