//!Nota: de este modo se crea un cli de node.js

//?Limpiador de la base de datos
import { exit } from "node:process";
import db from "../config/db";

const clearDB = async () => {
    try{
        await db.sync({force: true})
        console.log('Datos eliminados correctamente');
        exit(0) //? 0 o nada = finaliza con éxito
    }catch(error) {
        console.log(error)
        exit(1) //? 1 = finaliza con errores
    }
}

//Esto se ejecuta desde el cli de node
if(process.argv[2] === '--clear'){
    clearDB()
}

//? Para poder ejecutar este codigo después de un test, podemos poner un nuevo script "pretest": "ts-node ./src/data --clear"
//? Este "pretest" se ejecuta antes del test, si queremos ejecutar codigo despues de "test" podemos usar "postest"