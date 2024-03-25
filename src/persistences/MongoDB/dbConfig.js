import mongoose from "mongoose";

const URI = "mongodb+srv://lucaspanizzo99:Palermitano99@e-commerce.jglhxrw.mongodb.net/?retryWrites=true&w=majority&appName=E-Commerce";

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
