import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, MaxLength } from "class-validator";

@Entity()
export class Cliente {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, nullable: false })
    @MaxLength(50, { message: 'Debe contener un máximo de 50 caracteres.' })
    @IsNotEmpty({ message: 'Debe indicar el nombre del cliente.' })
    nombreCliente: string;

    @Column({ length: 50, nullable: false })
    @MaxLength(50, { message: 'Debe contener un máximo de 50 caracteres.' })
    @IsNotEmpty({ message: 'Debe indicar el apellido del cliente.' })
    apellidoCliente: string;

    @Column({ nullable: false })
    @IsNotEmpty({ message: 'Debe indicar la dirección del cliente.' })
    direccionCliente: string;

    @Column({ length: 15, nullable: false })
    @MaxLength(15, { message: 'Debe contener un máximo de 15 caracteres.' })
    @IsNotEmpty({ message: 'Debe indicar el teléfono del cliente.' })
    telefonoCliente: string;
    Factura: any;

}
