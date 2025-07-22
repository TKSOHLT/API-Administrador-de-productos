//**Se debe instalar un par de dependencias para que soporte typescript
// * las dependendicias son:
//  npm i -D typescript ts-node
//
// Si no se instala lo previo, se puede tener:
//!TypeError: Unknown file extension ".ts" for /Applications/XAMPP/xamppfiles/htdocs/Cursos/react/APIS/API-Administrador-de-productos/src/index.ts
//
// * Después se tiene que crear el archivo:
//      tsconfig.ts
// * Y por último, podemos ejecutar los archvos con:
//      npx ts-node src/index-ts

import colors from 'colors';
import server from "./server";

const post = process.env.PORT || 4000; //Esta variable de entorno siempre siempre se tiene que poner, porque se usa en el deploy
server.listen(post, () => {
  console.log(colors.cyan.bold(`REST api iniciado en el puerto ${post}`));
});


//!Decoradores:
//* Los decoradores normalmente utilizan @ que agregan una funciòn dentro de otra funciòn, 
//* es parecido al @override en java:
// Los decoradores son funciones que se aplican a clases o elementos de clases
// (métodos, propiedades, etc.) para añadirles comportamiento adicional sin
// modificar su definición original.

//!Testing: 
//**
// ?Para testear en este caso se usarà supertest y jest, se instala con:
// npm i -D supertest @types/supertest jest @types/jest ts-jest
// 
// ?Despuès de instalar ejecutar:
// npx ts-jest config:init 
// 
// *Jest puede leer archivos de 3 formas:
// - Archivos con la extensiòn .test.js
// - Archivos con la extensiòn .spec.js
// - Archivos dentro de la carpeta __tests__ (La mejor opciòn)
// */