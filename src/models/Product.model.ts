//!Decoradores:
// Los decoradores son funciones que se aplican a clases o elementos de clases
// (métodos, propiedades, etc.) para añadirles comportamiento adicional sin
// modificar su definición original.

import { Table, Column, Model, DataType} from 'sequelize-typescript'

@Table({
    tableName: 'products'
})

//El Model es una clase heredable donde podemos reescribir nuestros modelos
class products extends Model {
    @Column({
        type: DataType.STRING(100) // los parentesis es una extensión que indica máximo 100 caracteres
    })
    name: string

    @Column({
        type: DataType.FLOAT
    })
    price: number

    @Column({
        type: DataType.BOOLEAN
    })
    availability: boolean   
}

export default products;