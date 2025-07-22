//El describe es una función para agrupar una serie de pruebas que estén relacionadas
//Si se crea algo diferente, lo ideal es crear un descibr diferente
//Toma dos parametros: "nombre de la prueba", ()=> {}
//Dentro del callback se agregan las pruebas de forma indiviual, se puede usar con test() o it(),
//lo recomendable depende del equipo

//El describe agrupa, los it o test crean pruebas
// describe("Nuestro primer test", () => {
//   it("Debe revisar que 1+1 sean 2", () => {
//     //? expect(): espero un error? respuesta de API? un texto?
//     //? toBe(): es el valor con el cual se va a comparar (resultado)
//     expect(1 + 1).toBe(2);
//   });

//   it("Debe revisar que 1+1 no sean 3", () => {
//     //? not: no se manda a llamar, se concatena nomas
//     expect(1 + 1).not.toBe(3);
//   });
// });

//!Nota: se puede crear un script para ejecutar el test, esto se hace en package.json, en
//! "scripts":
//!     {
//!         "dev": ...
//!         "test": "jest --detectOpenHandles"
//!     }

import request from "supertest";
import server from "../server";

describe("GET /api", () => {
  it("should send back a json response", async () => {
    const res = await request(server).get("/api");

    //!Las pruebas deben ir acompañada de lo que debe hacer tanto de lo que no debe hacer

    //Lo que debe hacer:
    expect(res.status).toBe(200); // Validar que la respuesta este OK
    expect(res.headers["content-type"]).toMatch(/json/); //Validar que los datos enviados sea un json
    expect(res.body.msg).toBe("Desde API");
    
    //Lo que no debe hacer:
    expect(res.status).not.toBe(404)
    expect(res.body.msg).not.toBe('desde api')
    console.log(res.body.msg); //Permite acceder a todos los vaores de la respuesta
  });
});
