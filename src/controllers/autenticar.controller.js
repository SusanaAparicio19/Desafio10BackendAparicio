import { encriptar } from '../utils/cripto.js'
import { usersServices } from '../service/user.service.js';

const COOKIE_OPTS = { signed: true, maxAge: 1000 * 60 * 60, httpOnly: true }

export async function registerUser(req, _email, _password, done) {
    try {
      const user = await usersServices.createUser(req.body);
      done(null, user);
      console.log(user)
    } catch (error) {
      return done({ message: 'Error al registrar usuario', status: 400 });
    }
  }
  
export async function loginUser(email, password, done) {
    try {
      const user = await usersServices.findUserByEmail({ email, password });
      done(null, user);
    } catch (error) {
      return done({ message: 'Credenciales inválidas', status: 400 });
    }
  }
  
export async function jwtAuthentication(user, done) {
    done(null, user);
  }

export async function appendJwtAsCookie(req, res, next) {
    try {
      const jwt = await encriptar(req.user)
      res.cookie('autorizar', jwt, COOKIE_OPTS)
      next()
    } catch (error) {
      next(error)
    }
  }
  
export async function removeJwtFromCookies(req, res, next) {
    res.clearCookie('autorizar', COOKIE_OPTS)
    next()
  }