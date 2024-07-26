import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Cliente } from "./Cliente";
import { Productos } from "./Productos";
import { DetalleFactura } from "./DetalleFactura";
import { IsNotEmpty, IsDate, IsString } from "class-validator";

@Entity()
export class Factura {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "date" })
    @IsDate({ message: 'La fecha debe ser una fecha válida.' })
    fecha: Date;

    @Column()
    @IsString({ message: 'El vendedor debe ser una cadena de texto.' })
    vendedor: string;

    @ManyToOne(() => Cliente, (cliente) => cliente.Factura, { eager: true })
    @IsNotEmpty({ message: 'Debe indicar un cliente para la factura.' })
    cliente: Cliente;

    @OneToMany(() => DetalleFactura, (detalleFactura) => detalleFactura.factura, { cascade: true })
    detalles: DetalleFactura[];

    @Column({ default: true })
    estado: boolean;
    Productos: Productos[];
}
