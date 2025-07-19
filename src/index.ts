//**Se debe instalar un par de dependencias para que soporte typescript
// * las dependendicias son:
//  npm i -D typescript ts-node
//  
// Si no se instala lo previo, se puede tener:
//!TypeError: Unknown file extension ".ts" for /Applications/XAMPP/xamppfiles/htdocs/Cursos/react/APIS/API-Administrador-de-productos/src/index.ts
//
// *Después se tiene que crear el archivo:
//      tsconfig.ts
// * Y por último, podemos ejecutar los archvos con:
//      npx ts-node src/index-ts

import {sumar} from './server'

console.log('desde index')

sumar()