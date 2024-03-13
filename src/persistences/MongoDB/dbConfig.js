import mongoose from "mongoose";

const URI = "mongodb+srv://lucaspanizzo99:Palermitano99@e-commerce.jglhxrw.mongodb.net/?retryWrites=true&w=majority&appName=E-Commerce"

// Conectar a MongoDB
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Capturar eventos de conexión
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos MongoDB');
});

// Opcional: Capturar eventos de desconexión
db.on('disconnected', () => {
  console.log('Conexión a MongoDB cerrada');
});

// Opcional: Capturar eventos de cierre de la aplicación
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Conexión a MongoDB cerrada debido a la terminación de la aplicación');
    process.exit(0);
  });
});
