import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Socio } from 'src/socios/entities/socio.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({
    example: 1,
    description: 'Id del usuario',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'prueba123@gmail.com',
    description: 'Correo del usuario',
  })
  @Column('text', { unique: true, nullable: false, name: 'email' })
  correo: string;

  @ApiProperty({
    example: 'Tobias Escobar',
    description: 'Nombre completo del usuario',
  })
  @Column('text', { unique: true, name: 'fullName' })
  nombreCompleto: string;

  @ApiProperty({
    example: 'usuario',
    description: 'Contraseña del usuario',
  })
  @Column('text', {
    name: 'password',
  })
  contrasenha: string;

  @ApiProperty({
    example: true,
    description: 'Estado del usuario',
  })
  @Column('bool', {
    default: true,
    name: 'isActive',
  })
  activo: boolean;

  @ApiProperty({
    examples: ['usuario', 'socio'],
    description: 'Roles del usuario',
  })
  @Column('text', {
    array: true,
    default: ['usuario'],
  })
  roles: string[];

  @ApiProperty()
  @OneToOne(() => Socio, (socio) => socio.user)
  socio: Socio;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.correo = this.correo.toLowerCase();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.correo = this.correo.toLowerCase();
  }
}
