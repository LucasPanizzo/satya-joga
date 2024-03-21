import Express from "express";
import './persistences/MongoDB/dbConfig.js'
import products from './routers/products.router.js'
import { __dirname } from "./utilites.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { log } from "console";

// APP configuration
const app = Express()
const port = 5050

// Server configuration
const httpServer = app.listen(port, () => {
    console.log('Listening to port:'+port);
})

// General APP declarations
app.use(
    session({
        secret: 'secretKey',
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            mongoUrl: 'mongodb+srv://lucaspanizzo99:Panizzo99@coderhouse.3xliklk.mongodb.net/ecommerce?retryWrites=true&w=majority'
        }),
    })
)