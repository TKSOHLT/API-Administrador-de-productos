//!Decoradores:
// Los decoradores son funciones que se aplican a clases o elementos de clases
// (métodos, propiedades, etc.) para añadirles comportamiento adicional sin
// modificar su definición original.

import { Table, Column, Model, DataType, Default} from 'sequelize-typescript'

@Table({
    tableName: 'products'
})

//El Model es una clase heredable donde podemos reescribir nuestros modelos
class Product extends Model {
    @Column({
        type: DataType.STRING(100) // los parentesis es una extensión que indica máximo 100 caracteres
    })
    declare name: string

    @Column({
        type: DataType.FLOAT
    })
    declare price: number

    @Default(true) //El default siempre se coloca antes del column
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability: boolean   
}

export default Product;