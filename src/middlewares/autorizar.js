import { isUser, isAdmin, soloLogueadosApi, isPremium } from '../controllers/autorizar.controller.js'

export const usersOnly = isUser;
export const adminsOnly = isAdmin;
export const premiumOnly = isPremium;
export const soloLogueados = soloLogueadosApi
