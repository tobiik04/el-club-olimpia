import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'jugadores' })
export class Jugadores {
  @ApiProperty({
    example: 1,
    description: 'ID del jugador',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Juan Manuel',
    description: 'Nombre del jugador',
  })
  @Column('text')
  nombre: string;

  @ApiProperty({
    example: 'Salgueiro',
    description: 'Apellido del jugador',
  })
  @Column('text')
  apellido: string;

  @ApiProperty({
    example: 25,
    description: 'Edad del jugador',
  })
  @Column('int')
  edad: number;

  @ApiProperty({
    example: 10,
    description: 'Número del jugador',
  })
  @Column('int')
  @MaxLength(2)
  numero: number;

  @ApiProperty({
    example: 'Uruguayo',
    description: 'Nacionalidad del jugador',
  })
  @Column('text')
  nacionalidad: string;

  @ApiProperty({
    example: '1992-03-25',
    description: 'Fecha de nacimiento del jugador',
  })
  @Column({ type: 'date', name: 'fecha_nacimiento' })
  fechaNacimiento: Date;

  @ApiProperty({
    example: '2010-04-10',
    description: 'Fecha en que fue fichado',
  })
  @Column('date')
  fichado: Date;

  @ApiProperty({
    example: '2015-04-10',
    description: 'Fecha en que fue contratado',
  })
  @Column('date', {
    nullable: true,
  })
  contrato?: Date;

  @ApiProperty({
    example: 1000000,
    description: 'Valor de mercado en USD',
  })
  @Column({ type: 'int', name: 'valor_mercado_usd' })
  valorMercadoUsd: number;
}
