import express from 'express';
import passport from 'passport';
import User from "../models/usersModel.js"
import  jwt from 'jsonwebtoken';
import localStrategy from 'passport-local';
import { Strategy as JWTstrategy } from 'passport-jwt';
import { ExtractJwt as ExtractJWT } from 'passport-jwt';
import {getUsers, deleteUser,updateUser,getSingle} from "../controllers/authController.js"
import bcrypt from "bcrypt"
const {compare} = bcrypt
const router = express.Router();
router.use(passport.initialize());
passport.use(
    'signup',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await User.create({ email, password });
  
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  // ...

passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          User.findOne({ email : email }, async (err, data) => {
              if (data) {
                  if (password ==data.password) {
                      
                      return done(null, data, { message: "Logged In Successfully" })
                  } else {
                      return done(null, false, { message: "Password is incorrect" })
                  }
              } else {
                  return done(null, false, { message: "User not Found. Try to SignUp" })
              }
          })
      } catch(err) {
          console.log(err)
      }
      }
    )
  );
  
  passport.use(
    new JWTstrategy(
      {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('secret_token')
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);



router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');
            res.json({error:err,message:"there is no user"});
          }else{

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');

              return res.header("auth-token",token).json({
                message : info.message,
                token:token });
            }
          )};
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);
router.get("/users",passport.authenticate('jwt',{session:false}),getUsers)
router.get("/users/:id",passport.authenticate('jwt',{session:false}),getSingle)
router.delete("/users/:id",passport.authenticate('jwt',{session:false}),deleteUser)
router.put("/users/:id",passport.authenticate('jwt',{session:false}),updateUser)
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.status(200).json({
      code: 200,
      message: "Logged Out",
  })
  });
});

export default router;