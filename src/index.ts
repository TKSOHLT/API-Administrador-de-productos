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