import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config(); // Con esto se manda a llamar a las variables de entorno
// console.log(process.env) // Con esto se pueden ver las variables env disponibles

//!A continuación se muestra una conexión solo con el url dado de https://dashboard.render.com/d/dpg-d1v66dur433s73fd4ipg-a/recovery, (link de external connection), esto es sin SSL
// const db = new Sequelize("postgresql://rest_api_node_typescript_productos_0qz1_user:wCbJLesLzPd8k75WV9DhiPP5D5mLFw3f@dpg-d1v66dur433s73fd4ipg-a.oregon-postgres.render.com/rest_api_node_typescript_productos_0qz1");

//* La conexión previa nos da un error de conexión, ya que debe ser SSL, podemos forzar esto concatenando en el string de conexión lo siguiente:
// ?ssl=true
// const db = new Sequelize("postgresql://rest_api_node_typescript_productos_0qz1_user:wCbJLesLzPd8k75WV9DhiPP5D5mLFw3f@dpg-d1v66dur433s73fd4ipg-a.oregon-postgres.render.com/rest_api_node_typescript_productos_0qz1?ssl=true");

//*Hay otra opción que es sin forzar el ssl, se muestra a continuación:
// const db = new Sequelize("postgresql://rest_api_node_typescript_productos_0qz1_user:wCbJLesLzPd8k75WV9DhiPP5D5mLFw3f@dpg-d1v66dur433s73fd4ipg-a.oregon-postgres.render.com/rest_api_node_typescript_productos_0qz1", {
//     dialectOptions: {
//         ssl: {
//             require: false
//         }
//     }
// });

//? Pero lo recomendado siempre será el menor codigo, por lo que vamos a forzar el ssl con ?ssl=true
const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [__dirname + '/../models/**/*'],
  logging: false, //Con esto no evnia nada a la consola
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default db;
