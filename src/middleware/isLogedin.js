import passport from "passport";
import users from "../models/usersModel.js"
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(406).json({
        code: 406,
        message: "Log In First",
    })
}
function isLoggedInAsAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin === true ) return next();
    res.status(406).json({
        code: 406,
        message: "Log In as Admin First",
    })
}

export {
    isLoggedIn,
    isLoggedInAsAdmin
}