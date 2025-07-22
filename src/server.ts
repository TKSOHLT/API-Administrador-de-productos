import express from "express";
import colors from 'colors'
import router from "./router";
import db from "./config/db";

//Conectar a base de datos
async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.magenta("Conexión exitosa a la BD"));
  } catch (error) {
    console.log(error);
    console.log(colors.red.bold("Hubo un error al conectar a la BD"));
  }
}
connectDB();

//Instancia de express
const server = express();

//Leer datos de formularios
server.use(express.json()) //Habilita la lectura de json en los req.body de los endpoints

//Se pueden tener multiples archivos de routers con sus respectivos prefijos de endpoints
server.use("/api/products", router);

export default server;
