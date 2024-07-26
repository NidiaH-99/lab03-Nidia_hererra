import { Router } from "express";
import FacturasController from "../controller/FacturasController";

const routes= Router();

routes.get("", FacturasController.getAll)
routes.get("/getOne/:id", FacturasController.getOne)
routes.post("", FacturasController.create)
routes.put("/:id", FacturasController.update)
routes.delete("/:id", FacturasController.delete)


export default routes;

