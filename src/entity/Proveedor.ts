import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, MaxLength } from "class-validator";

@Entity()
export class Proveedor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, nullable: false })
    @MaxLength(50, { message: 'Debe contener un máximo de 50 caracteres.' })
    @IsNotEmpty({ message: 'Debe indicar el nombre del proveedor.' })
    nombreProveedor: string;

    @Column({ length: 50, nullable: false })
    @MaxLength(50, { message: 'Debe contener un máximo de 50 caracteres.' })
    @IsNotEmpty({ message: 'Debe indicar el apellido del proveedor.' })
    apellidoProveedor: string;

    @Column({ nullable: false })
    @IsNotEmpty({ message: 'Debe indicar la dirección del proveedor.' })
    direccionProveedor: string;

    @Column({ length: 50, nullable: false })
    @MaxLength(50, { message: 'Debe contener un máximo de 50 caracteres.' })
    @IsNotEmpty({ message: 'Debe indicar la provincia del proveedor.' })
    provinciaProveedor: string;

    @Column({ length: 15, nullable: false })
    @MaxLength(15, { message: 'Debe contener un máximo de 15 caracteres.' })
    @IsNotEmpty({ message: 'Debe indicar el teléfono del proveedor.' })
    telefonoProveedor: string;

}
