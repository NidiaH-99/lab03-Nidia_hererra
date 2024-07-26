import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Productos } from "./entity/Productos"
import { Categoria } from "./entity/Categoria"
import { Vendedor } from "./entity/Vendedor"
import { Proveedor } from "./entity/Proveedor"
import { Cliente } from "./entity/Cliente"
import { CabeceraFactura } from "./entity/CabeceraFactura"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "ejemplodb",
    synchronize: true,
    logging: false,
    entities: [User, Productos, Categoria, Vendedor, Proveedor, Cliente, CabeceraFactura],
    migrations: [],
    subscribers: [],
})
