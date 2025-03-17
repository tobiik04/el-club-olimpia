import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { User } from 'src/auth/entities/user.entity';

export class CreateSocioDto {
  @ApiProperty({
    example: '8412401',
    description: 'Documento del socio',
  })
  @IsString()
  documento: string;

  @ApiProperty({
    example: '0981234564',
    description: 'Teléfono del socio',
  })
  @IsString()
  @MinLength(10, {
    message: 'El teléfono debe tener al menos 10 caracteres',
  })
  telefono: string;

  @IsDateString()
  fechaNacimiento: string;

  @ApiProperty({
    example: 'Calle ejemplo 123',
    description: 'Dirección del socio',
  })
  @IsString()
  @MinLength(5, {
    message: 'La dirección debe tener al menos 5 caracteres',
  })
  direccion: string;

  @ApiProperty({
    example: 'socio-familiar',
    description: 'Tipo de socio',
  })
  @IsString()
  @IsEnum([
    'socio-familiar',
    'socio-cadete',
    'socio-infantil',
    'socio-estadio',
    'socio-personal',
  ])
  tipo: string;

  @ApiProperty({
    example: '1',
    description: 'Id del usuario relacionado al socio',
  })
  @IsOptional()
  user?: User;
}
