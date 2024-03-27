import mongoose from "mongoose";

const URI = "mongodb+srv://lucaspanizzo99:Palermitano99@ecommerce.ywluyky.mongodb.net/?retryWrites=true&w=majority&appName=eCommerce";

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos MongoDB');
});

export default db;
