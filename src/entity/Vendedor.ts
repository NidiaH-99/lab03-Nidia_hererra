import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, MaxLength, IsPhoneNumber } from 'class-validator';

@Entity()
export class Vendedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  @MaxLength(50, { message: 'El nombre del vendedor debe contener un máximo de 50 caracteres.' })
  @IsNotEmpty({ message: 'Debe indicar el nombre del vendedor.' })
  nombre_vendedor: string;

  @Column({ length: 50, nullable: false })
  @MaxLength(50, { message: 'El apellido del vendedor debe contener un máximo de 50 caracteres.' })
  @IsNotEmpty({ message: 'Debe indicar el apellido del vendedor.' })
  apellido_vendedor: string;

  @Column({ length: 100, nullable: false })
  @MaxLength(100, { message: 'La dirección del vendedor debe contener un máximo de 100 caracteres.' })
  @IsNotEmpty({ message: 'Debe indicar la dirección del vendedor.' })
  direccion_vendedor: string;

  @Column({ length: 15, nullable: false })
  @MaxLength(15, { message: 'El teléfono del vendedor debe contener un máximo de 15 caracteres.' })
  @IsPhoneNumber(null, { message: 'Debe indicar un número de teléfono válido.' })
  @IsNotEmpty({ message: 'Debe indicar el teléfono del vendedor.' })
  telefono_vendedor: string;

  @Column({ length: 15, nullable: false })
  @MaxLength(15, { message: 'El celular del vendedor debe contener un máximo de 15 caracteres.' })
  @IsPhoneNumber(null, { message: 'Debe indicar un número de celular válido.' })
  @IsNotEmpty({ message: 'Debe indicar el celular del vendedor.' })
  celular_vendedor: string;
}