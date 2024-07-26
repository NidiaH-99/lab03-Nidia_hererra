import { Router } from "express";
import ProveedorController from "../controller/ProveedorController";

const routes= Router();

routes.get("", ProveedorController.getAll)
routes.get("/getOne/:id", ProveedorController.getOne)
routes.post("", ProveedorController.create)
routes.put("/:id", ProveedorController.update)
routes.delete("/:id", ProveedorController.delete)


export default routes;
