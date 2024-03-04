import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import { PORT, MONGODB_CNX_STR } from './config.js';
import { productsRouter } from './routers/productsRouter.js';
import { webRouter } from "./routers/webR/webRouter.js"
import { apiRouter } from './routers/apiR/apirestRouter.js';
import { sessions } from './middlewares/sessions.js'
import { responseFailed } from './middlewares/responseFailed.js'
import { responseSuccessfull } from './middlewares/responseSuccessfull.js';
import cartsRouter from './routers/cartsRouter.js';
import ticketsRouter from './routers/ticketRouter.js';
import { passportInitialize } from './middlewares/autenticar.js';
import { loggerInRequest } from './middlewares/logger.js';
import { loggerUtils } from './utils/loggerUtils.js';
import { loggerTest } from './controllers/loggerTest.controller.js';
//import { errorHandler } from './middlewares/errors.js'
import { cookies } from './middlewares/cookies.js'



//export const ProdMan = new ProductManagerMongo({ path: './db/products.json' });
//@ts-ignore
//await mongoose.connect(CNX_STR)
await mongoose.connect(MONGODB_CNX_STR)
  //console.log(`Base de Datos Conectada ${CNX_STR}`)
  loggerUtils.info(`Base de Datos Conectada`)

const app = express()

app.engine('handlebars', engine());

app.use(loggerInRequest);

app.listen(PORT, async () => {
  loggerUtils.info(`Conectado al puerto ${PORT}`);
});


app.set('views', './views');
app.set(`view engine`, 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookies)


app.use(passportInitialize);
app.use(sessions);

app.use('/static', express.static('./static'))


app.use('/', webRouter);
app.use('/api',apiRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/tickets', ticketsRouter);

//app.use(errorHandler)
app.use(responseFailed);
app.use(responseSuccessfull);
app.get('/loggerTest', loggerTest)