import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsDateString,
  IsBoolean,
} from 'class-validator';

export class CreateNoticiaDto {
  @ApiProperty({
    example: 'Nueva noticia',
    description: 'Título de la noticia',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({
    example: 'Contenido de la noticia',
    description: 'Contenido de la noticia',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contenido: string;

  @ApiProperty({
    example: false,
    description: 'Indica si la noticia es exclusiva para socios',
  })
  @IsBoolean()
  exclusiva?: boolean;

  @ApiProperty({
    example: 'my-image-url.com',
    description: 'Link de la imagen de la noticia',
  })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
