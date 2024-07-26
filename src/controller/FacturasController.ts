import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { DetalleFactura } from "../entity/DetalleFactura";
import { Productos } from "../entity/Productos";
import { Cliente } from "../entity/Cliente";
import { ValidationError, validate } from "class-validator";
import { Factura } from "../entity/Factura";

class FacturaController {

    static getAll = async (req: Request, res: Response) => {
        try {
            const repo = AppDataSource.getRepository(DetalleFactura);
            const facturas = await repo.find({ relations: ["cliente", "productos"] });

            if (facturas.length === 0) {
                return res.status(404).json({ message: "No hay facturas registradas." });
            }

            return res.status(200).json(facturas);
        } catch (error) {
            return res.status(400).json({ message: "Error al acceder a la base de datos." });
        }
    };

    static getOne = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params['id']);
            
            if (!id) {
                return res.status(400).json({ message: "Debe indicar el ID." });
            }

            const repo = AppDataSource.getRepository(DetalleFactura);
            try {
                const factura = await repo.findOneOrFail({ where: { id }, relations: ["cliente", "productos"] });
                return res.status(200).json(factura);
            } catch (error) {
                return res.status(404).json({ message: "Factura no encontrada." });
            }
        } catch (error) {
            return res.status(404).json({ message: "Error al buscar la factura." });
        }
    };

    static create = async (req: Request, res: Response) => {
        const facturaRepo = AppDataSource.getRepository(DetalleFactura);
        const productoRepo = AppDataSource.getRepository(Productos);
        const clienteRepo = AppDataSource.getRepository(Cliente);

        try {
            const { fecha, clienteId, vendedor, productosIds } = req.body;

            if (!fecha || !clienteId || !vendedor || !productosIds) {
                return res.status(400).json({ message: "Debe proporcionar todos los datos necesarios." });
            }

            const cliente = await clienteRepo.findOne({ where: { id: clienteId } });
            if (!cliente) {
                return res.status(400).json({ message: "Cliente no encontrado." });
            }

            const productos = await productoRepo.findByIds(productosIds);
            if (productos.length === 0) {
                return res.status(400).json({ message: "No se encontraron productos." });
            }

            let factura = new Factura();
            factura.fecha = new Date(fecha);
            factura.cliente = cliente;
            factura.vendedor = vendedor;
            factura.Productos = productos;
            factura.estado = true;

            const errors: ValidationError[] = await validate(factura);
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            await facturaRepo.save(factura);
            return res.status(201).json(factura);
        } catch (error) {
            return res.status(400).json({ message: "Error al guardar la factura." });
        }
    };

    static update = async (req: Request, res: Response) => {
        const facturaRepo = AppDataSource.getRepository(DetalleFactura);
        const productoRepo = AppDataSource.getRepository(Productos);
        const clienteRepo = AppDataSource.getRepository(Cliente);

        try {
            const id = parseInt(req.params['id']);
            const { fecha, clienteId, vendedor, productosIds } = req.body;

            if (!id) {
                return res.status(400).json({ message: "Debe indicar el ID." });
            }

            let factura = await facturaRepo.findOne({ where: { id }, relations: ["productos", "cliente"] });
            if (!factura) {
                return res.status(404).json({ message: "Factura no encontrada." });
            }

            if (fecha) factura.fecha = new Date(fecha);
            if (clienteId) {
                const cliente = await clienteRepo.findOne({ where: { id: clienteId } });
                if (!cliente) {
                    return res.status(400).json({ message: "Cliente no encontrado." });
                }
                factura.cliente = cliente;
            }
            if (vendedor) factura.vendedor = vendedor;
            if (productosIds) {
                const productos = await productoRepo.findByIds(productosIds);
                if (productos.length === 0) {
                    return res.status(400).json({ message: "No se encontraron productos." });
                }
                factura.productos = productos;
            }

            const errors: ValidationError[] = await validate(factura);
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            await facturaRepo.save(factura);
            return res.status(200).json(factura);
        } catch (error) {
            return res.status(400).json({ message: "Error al actualizar la factura." });
        }
    };

    static delete = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params['id']);

            if (!id) {
                return res.status(400).json({ message: "Debe indicar el ID." });
            }

            const repo = AppDataSource.getRepository(DetalleFactura);
            let factura;
            try {
                factura = await repo.findOneOrFail({ where: { id } });
            } catch (error) {
                return res.status(404).json({ message: "Factura no encontrada." });
            }

            factura.estado = false;
            await repo.save(factura);
            return res.status(200).json({ message: "Factura eliminada correctamente." });
        } catch (error) {
            return res.status(400).json({ message: "Error al eliminar la factura." });
        }
    };
}

export default FacturaController;
