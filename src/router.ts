import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

//*Nota: HTTP solo soporta dos verbos "POST" y "GET"
router.get("/", getProducts);
//? Routing dinamico de express:
router.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  //?Middleware:
  handleInputErrors, //-> Son reutilizables
  getProductById
);

//? Se pueden crear handlers para minimizar el tamaño de router.ts, después de lo comentado se muestra el router con el handler
router.post(
  "/",
  //Validación
  //Al igual que como en el handler, la validación se puede pasar en el controlador (router)
  //pero aqui no son asincronas, no se usa await ni tampoco se usa .run, se utiliza
  //body como se muestra a continuación:
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacío"),
  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacío")
    .custom((value) => value > 0)
    .withMessage("Precio no válido"), //Custom validation
  //Y aquí no se puede obtener el validationResult, se tiene que pasar al handler
  // // let errors = validationResult(req);
  // // if (!errors.isEmpty()) {
  // //   return res.status(400).json({ errors: errors.array() });
  // // }
  //?Middleware:
  handleInputErrors, //Función intermedia que se ejecuta en el request
  createProduct
);

router.put(
  "/:id",
  //Validar
  param("id").isInt().withMessage("ID no válido"),
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacío"),
  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacío")
    .custom((value) => value > 0)
    .withMessage("Precio no válido"),
  body("availability")
    .isBoolean()
    .withMessage("Valor para disponibilidad no válido"),
  handleInputErrors, //?Middleware
  updateProduct
);

router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors, //?Middleware
  updateAvailability
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors, //?Middleware
  deleteProduct
);

export default router;
