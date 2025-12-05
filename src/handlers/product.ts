import { Request, Response } from "express";
import Product from "../models/Product.model";

//!Pregunta de entrevista:

export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.findAll({
        order: [
            ['id', 'DESC']
        ],
        attributes: {exclude: ['createdAt', 'updatedAt']} //Con esto excluimos estas columnas para la consulta
    })
    res.json({data: products}); //Usualmente colocamos data por el axios
}

export const getProductById = async (req: Request, res: Response) => {
    //Para obtener los query params es con req.params.variable
    const { id } = req.params // hacemos destructuring
    const product = await Product.findByPk(id);

    if(!product){
        return res.status(404).json({
            error: "Producto no encontrado"
        })
    }

    res.json({
        data: product
    })
}

export const createProduct = async (req: Request, res: Response) => {
  //!Nota: Si intentamos hacer un req.body sin haber configurado en server.ts la lectura, nos saldrá como "undefined"
  // console.log(req.body)
  //Para habilitar la lectura de json es con: server.use(express.json())

  //   const product = new Product(req.body);
  //     //? Para usar el new necesitamos en tsconfig.json habilitar:
  //     //* "target": "esnext",
  //     //* "moduleResolution": "nodenext",
  //     //* "module": "nodenext"

  //   const saveProduct = product.save(); //Almacenar en la tabla productos de la bd

  //   //Validación
  //   await check("name")
  //     .notEmpty()
  //     .withMessage("El nombre del producto no puede ir vacío")
  //     .run(req);
  //   await check("price")
  //     .isNumeric()
  //     .withMessage("Valor no válido")
  //     .notEmpty()
  //     .withMessage("El precio del producto no puede ir vacío")
  //     .custom((value) => value > 0)
  //     .withMessage("Precio no válido") //Custom validation
  //     .run(req);

  //Los errores que se muestran a continuación, se pueden colocar en algo llamado "Middleware"
  //   let errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }
  //!La validación tambien puede ir en el controlador (router)

    //Lo previo (omitiendo la validación) tambien se puede con:
    const product = await Product.create(req.body);
    //!NOTA: siempre que se trabaje con la creación, se debe retornar un codigo 201
    res.status(201).json({ data: product });
};

//***************************************************** */
//!DIFERENCIA ENTRE PUT Y PATCH (Pregunta de entrevista)

//?PUT: Se usa para actualizar o reemplazar completamente un recurso existente en un servidor web, se le dice al servidor que tome
//?La información proporcionada y la utilice para reemplazar completamente el recurso en la ubicación específica.
//? Por ejemplo: Si se tiene un JSON que representa un producto y se hace una petición put al servidor con ese objeto, el servidor 
//? Reemplazará completamente los datos del producto existente con los datos proporcionados en la solicitud PUT.
//? En otras palabras, se debe enviar completamente el objeto cuando se esté modificando, si falta algún campo este desaparecerá.

//*PATCH:  
//* Se utiliza para realizar modificaicones parciales en un recurso existente en un servidor web.
//* En lugar de reemplazar totalmente el recurso como lo hace PUT, PATCH permite realizar cambios especificos en los datos del
//* recurso, sin afectar el resto de la información.
//* Ejemplo: Si se tiene un objeto JSON que representa un producto y se hace una solicitud PATCH al servidor con una pequeña 
//* parte de los datos actualizados (por ejemplo, cambiar solo la disponibilidad), el servidor aplicará esos cambios sin afectar
//* otros detalles del producto

//? Conculsión:
//! PUT = Actualizar
//* PATCH: Modificar
//***************************************************** */

//!la siguiente función es para PUT
//!Importante: Cuando se trabaja con PUT se tiene que actualizar todo
//?PUT reemplaza el elemento con lo que enviemos, si por ejemplo etnemos en nuestro objeto nombre, precio, disponibilidad
//? Y en nuestra petición solo mandamos disponibilidad, el nombre y el precio
export const updateProduct = async (req: Request, res: Response) => {
    //!PUT es un metodo que hace modificaciones totales
    //Primero se tiene que hacer una consulta praa ver si el producto existe
    const {id} = req.params;
    const product = await Product.findByPk(id);

    if(!product){
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    //Actualizar
    // console.log(req.body) //Siempre sera request body para el paso de información sin query params
    await product.update(req.body); //?UPDATE: Hace modificaciones parciales, esto protege a nuestros demas campos, si lo hacemos de la manera siguiente:
    //!Lo siguiente no tiene la protección de update(), por lo que, si solo se encuentra el "availability", los demás campos se irán
    // product.name = req.body.name;
    // product.price = req.body.price;
    // product.availability = req.body.availability;
    await product.save()

    res.json({data: product})
} 

//!La siguiente función es para PATCH
//!Importante: Cuando se trabaja con PATCH se puede actualizar solo unos cuantos parametros
//?En el caso de PATCH solo reemplaza los campos disponibles
export const updateAvailability = async (req: Request, res: Response) => {
    const {id} = req.params;
    const product = await Product.findByPk(id);

    if(!product){
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    //?Para el PATCH
    // await product.update(req.body); //?UPDATE: Hace modificaciones parciales, esto protege a nuestros demas campos, si lo hacemos de la manera siguiente:
    product.availability = !product.dataValues.availability //Esto es un toggle de availability, se obtienen los datos de la bd y se niegan para asignarse
    await product.save()

    res.json({data: product})
} 


//? Delete
export const deleteProduct = async (req: Request, res: Response) => {
    const {id} = req.params;
    const product = await Product.findByPk(id);

    if(!product){
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    await product.destroy() //Elimina de la base de datos
    res.json({data: 'Producto eliminado'});
} 

//!Nota: El eliminado lógico es un campo auxiliar algo como "visible" y que sea 1 o 0 o true o false, para evitar eliminar información
//?NO SE PUEDE BORRAR LA INFORMACION, NO UTILIZAR .destroy(), UTILIZAR ELIMINADO LOGICO