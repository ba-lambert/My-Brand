// import passport from 'passport';
// // User model
// import User from '../models/usersModel.js';
 
// // Strategies
// import JwtStrategy from 'passport-jwt';
// import ExtractJwt from 'passport-jwt';
// import LocalStrategy from 'passport-local';
// // Used to create, sign, and verify tokens
// import jwt from 'jsonwebtoken';
 
// // Local strategy with passport mongoose plugin User.authenticate() function
// passport.use(new LocalStrategy.Strategy(User.authenticate()));
 
// // Required for our support for sessions in passport.
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
 
// export function getToken(user) {
//     // This helps us to create the JSON Web Token
//     return jwt.sign(user, "secretKey",{expiresIn: 3600});
//  }
  
 
// // Options to specify for my JWT based strategy.
// var opts = {};
 
// // Specifies how the jsonwebtoken should be extracted from the incoming request message
// opts.jwtFromRequest = ExtractJwt.ExtractJwt.fromAuthHeaderAsBearerToken();
 
// //Supply the secret key to be using within strategy for the sign-in.
// opts.secretOrKey = "secretKey";
 
// export const jwtPassport = passport.use(new JwtStrategy.Strategy(opts,
//    // The done is the callback provided by passport
//    (jwt_payload, done) => {
     
//        // Search the user with jwt.payload ID field
//        User.findOne({_id: jwt_payload._id}, (err, user) => {
//            // Have error
//            if (err) {
//                return done(err, false);
//            }
//            // User exist
//            else if (user) {
//                return done(null, user);
//            }
//            // User doesn't exist
//            else {
//                return done(null, false);
//            }
//        });
//    }));
 
// export const verifyUser = passport.authenticate('jwt', {session: false});














