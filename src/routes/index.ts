import {Router} from "express"
import productos from "./productos";
import categoria from "./categorias";
import proveedor from "./proveedor";

const routes= Router();

routes.use("/Productos", productos )
routes.use("/Categoria", categoria )
routes.use("/Proveedor", proveedor )

export default routes;

