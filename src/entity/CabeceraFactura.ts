import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsDate, IsString, MaxLength } from 'class-validator';
import { Vendedor } from './Vendedor';

@Entity()
export class CabeceraFactura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: false })
  @IsDate({ message: 'Debe indicar una fecha válida.' })
  @IsNotEmpty({ message: 'Debe indicar la fecha.' })
  fecha: Date;

  @Column({ length: 13, nullable: false })
  @MaxLength(13, { message: 'El RUC del cliente debe contener un máximo de 13 caracteres.' })
  @IsString({ message: 'Debe indicar un RUC válido.' })
  @IsNotEmpty({ message: 'Debe indicar el RUC del cliente.' })
  ruc_cliente: string;

  @ManyToOne(() => Vendedor)
  @IsNotEmpty({ message: 'Debe indicar el código del vendedor.' })
  codigo_vendedor: Vendedor;
}