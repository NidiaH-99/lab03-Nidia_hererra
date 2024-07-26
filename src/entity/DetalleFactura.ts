import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
 

@Entity()
export class DetalleFactura {

    @PrimaryGeneratedColumn()
    id: number;

    

    @Column()
    @IsNotEmpty({ message: 'Debe indicar la cantidad.' })
    @IsNumber({}, { message: 'La cantidad debe ser un número.' })
    @IsPositive({ message: 'La cantidad debe ser positiva.' })
    cantidad: number;

    @Column()
    @IsNotEmpty({ message: 'Debe indicar el código del producto.' })
    codigoProducto: string; // Asumiendo que el código del producto es un string
    productos: import("c:/Users/nidia/OneDrive/Escritorio/WEB-II/clase07/src/entity/Productos").Productos[];
    fecha: Date;
    cliente: import("c:/Users/nidia/OneDrive/Escritorio/WEB-II/clase07/src/entity/Cliente").Cliente;
    vendedor: any;
    factura: any;

}
