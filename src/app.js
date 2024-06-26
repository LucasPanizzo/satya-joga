// app.js
import express from "express";
import './persistences/MongoDB/dbConfig.js';
import products from './routers/products.router.js';
import carts from './routers/carts.router.js'
import sessions from './routers/sessions.router.js'
import { __dirname } from "./utilites.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import db from './persistences/MongoDB/dbConfig.js'; // Importa la conexión a la base de datos
import { v4 as uuidv4 } from 'uuid';

// APP configuration
const app = express()
const port = 5050

// Server configuration
app.listen(port, () => {
    console.log('Listening to port:'+port);
})
// General APP declarations
app.use(
    session({
        genid: (req) => {
            return uuidv4(); // Genera un UUID aleatorio
          },
        secret: 'secretKey',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: 'mongodb+srv://lucaspanizzo99:Palermitano99@ecommerce.ywluyky.mongodb.net/?retryWrites=true&w=majority&appName=eCommerce',
            dbName: 'test',
            collectionName: 'sessions'
        }),
    })
)

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use('/api/products', products)
app.use('/api/carts', carts)
app.use('/api/sessions', sessions)
