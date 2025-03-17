import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'noticias' })
export class Noticia {
  @ApiProperty({
    example: 1,
    description: 'Identificador único de la noticia',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Título de la noticia',
    description: 'Título de la noticia',
  })
  @Column()
  titulo: string;

  @ApiProperty({
    example: 'Contenido de la noticia',
    description: 'Contenido de la noticia',
  })
  @Column({ type: 'text' })
  contenido: string;

  @ApiProperty({
    example: 'https://www.example.com/imagen.jpg',
    description: 'URL de la imagen de la noticia',
  })
  @Column({ nullable: true, name: 'imagen_url' })
  imagenUrl?: string;

  @ApiProperty({
    example: true,
    description: 'Noticia exclusiva para socios',
  })
  @Column({ name: 'exclusiva' })
  exclusiva: boolean;

  @ApiProperty({
    example: '2021-10-10',
    description: 'Fecha de publicación, se asigna automáticamente al crearla',
  })
  @CreateDateColumn({
    name: 'fecha_publicacion',
    default: () => 'CURRENT_DATE',
  })
  fechaPublicacion: string;
}
