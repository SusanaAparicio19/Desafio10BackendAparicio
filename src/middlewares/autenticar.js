import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { usersServices } from '../service/user.service.js';
import { registerUser, loginUser, jwtAuthentication } from '../controllers/autenticar.controller.js'
//import { JWT_PRIVATE_KEY } from '../config.js';


passport.use('localRegister', new LocalStrategy(
  { passReqToCallback: true },
  registerUser
));

passport.use('localLogin', new LocalStrategy(
  loginUser
));


passport.use('jwtAuth', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([function (req) {
    let token = null
    if (req?.signedCookies) {
      token = req.signedCookies['authorization']
    }
    return token
  }]),
  secretOrKey: 'secretkey'
}, jwtAuthentication));


passport.use('current', new LocalStrategy(
  { usernameField: 'email' }, 
  (email, password, done) => { 
    usersServices.findUserByEmail(email), (error, user) => { 
      if (error) { 
        return done(error);
      }
      if (!user) { 
        return done(null, false, { message: 'Usuario no encontrado' });
      }
      if (user.role !== 'admin' || !user.comparePassword(password)) {
        return done(null, false, { message: 'Credenciales inválidas o acceso no autorizado' });
      }
      return done(null, user);
    }
  }
));


passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()
