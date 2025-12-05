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


router.get("/", getProducts);

router.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  //?Middleware:
  handleInputErrors, //-> Son reutilizables
  getProductById
);

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

/**
 * @swagger
 * /api/products/${id}:
 *  put:
 *    summary: Updates a product with user input
 *    tags:
 *      - Products
 *    description: Returns the updated product
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to retrieve
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Monitor Curvo 49 Pulgadas"
 *              price:
 *                type: number
 *                example: 399
 *              availability:
 *                type: boolean
 *                example: true
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Product"
 *      400:
 *        description: Bad Request - Invalid ID or invalid input data
 *      404:
 *        description: Product Not Found
 */
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

/**
 * @swagger
 * /api/products/${id}:
 *  patch:
 *    summary: Update Product availability
 *    tags:
 *      - Products
 *    description: Returns the updated availability
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to retrieve
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Product"
 *      400:
 *        description: Bad Request - Invalid ID
 *      404:
 *        description: Product Not Found
 *      
 */
router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors, //?Middleware
  updateAvailability
);

/**
 * @swagger
 * /api/products/${id}:
 *  delete:
 *    summary: Delete a product with user input
 *    tags:
 *      - Products
 *    description: Returns the updated product
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to delete
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Successful
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              value: "Producto eliminado"
 *      404:
 *        description: Product not found
 */
router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors, //?Middleware
  deleteProduct
);

export default router;
