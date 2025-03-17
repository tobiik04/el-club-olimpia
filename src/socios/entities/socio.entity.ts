import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsIn, MinLength } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'socios' })
export class Socio {
  @ApiProperty({
    example: 1,
    description: 'Id del socio',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: () => 'CURRENT_DATE',
    description:
      'Fecha en que se, se asigna automáticamente a fecha actual al crearlo',
  })
  @Column('date', {
    default: () => 'CURRENT_DATE',
    name: 'fecha_asociacion',
  })
  fechaAsociacion: string;

  @ApiProperty({
    example: '12345678',
    description: 'Documento del socio',
  })
  @Column({ type: 'text', unique: true })
  documento: string;

  @ApiProperty({
    example: '0971782440',
    description: 'Teléfono del socio',
  })
  @Column({ type: 'text' })
  telefono: string;

  @ApiProperty({
    example: '2004-01-09',
    description: 'Fecha de nacimiento del socio',
  })
  @Column({ type: 'date', name: 'fecha_nacimiento' })
  fechaNacimiento: Date;

  @ApiProperty({
    example: 'Chacarita 123',
    description: 'Dirección del socio',
  })
  @Column({ type: 'text' })
  @MinLength(5)
  direccion: string;

  @ApiProperty({
    example: 'socio-familiar',
    description: 'Tipo de plan del socio',
  })
  @Column('text')
  @IsIn([
    'socio-familiar',
    'socio-cadete',
    'socio-infantil',
    'socio-estadio',
    'socio-personal',
  ])
  tipo: string;

  @ApiProperty({
    example: true,
    description: 'Estado del socio',
  })
  @Column({ type: 'bool', default: true })
  @IsBoolean()
  activo: boolean;

  @OneToOne(() => User, (user) => user.socio, { eager: true })
  @JoinColumn({ name: 'user' })
  user: User;
}
