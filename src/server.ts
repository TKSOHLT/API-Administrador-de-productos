import express from 'express';
import colors from 'colors';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from './config/swagger';
import router from './router';
import db from './config/db';

//Conectar a base de datos
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log(colors.magenta("Conexión exitosa a la BD"));
  } catch (error) {
    // console.log(error);
    console.log(colors.red.bold('Hubo un error al conectar a la BD'));
  }
}
connectDB();

//Instancia de express
const server = express();

//Permitir conexiones
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if(origin === process.env.FRONTEND_URL){
      callback(null, true);
    }else{
      callback(new Error("Error de CORS"));
    }
  },
};

server.use(cors(corsOptions)); //Recordatorio: se va a ejecutar en todo tipo de petición (POST,PATCH,PUT, etc...)


//Leer datos de formularios
server.use(express.json()); //Habilita la lectura de json en los req.body de los endpoints

server.use(morgan('combined'));
//Se pueden tener multiples archivos de routers con sus respectivos prefijos de endpoints
server.use('/api/products', router);

//Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));
export default server;

//!Tip: lo que se crea en la carpeta __tests__ debe de tener el mismo nombre que el archivo a probar
//!Ejemplo: server.ts su test se debe llamar server.test.ts
