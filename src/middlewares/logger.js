import { loggerUtils } from '../utils/loggerUtils.js';

export const loggerInRequest = (req, res, next) => {
    req.loggerUtils = loggerUtils
    req.loggerUtils.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}