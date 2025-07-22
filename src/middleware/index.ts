//!Nota: entrevista:
//**Middleware
// 
// Es un tipo de software intermedio usado papra procesar las solicitudes HTTP
// que llegan a una aplicaciòn web antes de ser manejadas por la funciòn de enrutamiento principal.
// 
// Son funciones que se ejecutan en el medio del flujo de solicitud y respuesta de una app web,
// pueden realizar diversas tareas como autenticaciòn, validaciòn de datos, registros de solicitudes,
// compresiòn de respuestas, entre otras.
// 
// Se ejecutan en el medio del flujo de la solicitud (se ejecuta entre una acciòn u otra)
// 
// En node, son esenciales para la creaciòn de apps robustas y flexibles, permite modularizar y organizar
// el codigo de manera efectura ya que se puede agregar o quitar middleware segun las necesidades.
// */

import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Para el middleware es necesario poner el next() que basicamente significa "Vete a la siguiente función"
    next();
}