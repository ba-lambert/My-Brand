import {Router} from "express"
import {registerUser,signIn} from "../controllers/authController.js"
import passport from "passport";
import LocalStrategy from 'passport-local';
import User from '../models/usersModel.js'
import bcrypt from 'bcryptjs'
const router =Router();
router.post("/register",registerUser);
router.use(passport.initialize());
router.use(passport.session());
const {compare} = bcrypt
passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    },
    async (email, password, done) => {
        try {
            User.findOne({ email : email }, async (err, data) => {
                if (data) {
                    const passCheck = await compare( password, data.password )
                    if (passCheck) {
                        return done(null, data)
                    } else {
                        return done(null, false)
                    }
                } else {
                    return done(null, false)
                }
            })
        } catch(err) {
            console.log(err)
        }
    }
));
// passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
router.post("/login", passport.authenticate("local", {
    successMessage: "loggedIn",
    failureMessage: "Not LoggedIn"
}), signIn);
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.status(200).json({
        code: 200,
        message: "Logged Out",
    })
    });
});
export default router