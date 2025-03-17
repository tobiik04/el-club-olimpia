import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateJugadoresDto {
  @ApiProperty({
    example: 'Juan Manuel',
    description: 'Nombre del jugador',
  })
  @IsString()
  @MinLength(3)
  nombre: string;

  @ApiProperty({
    example: 'Salgueiro',
    description: 'Apellido del jugador',
  })
  @IsString()
  @MinLength(3)
  apellido: string;

  @ApiProperty({
    example: 25,
    description: 'Edad del jugador',
  })
  @IsNumber()
  @IsPositive()
  edad: number;

  @ApiProperty({
    example: 1,
    description: 'Número del jugador',
  })
  @IsNumber()
  @IsPositive()
  numero: number;

  @ApiProperty({
    example: 'Uruguayo',
    description: 'Nacionalidad del jugador',
  })
  @IsString()
  @MinLength(2)
  nacionalidad: string;

  @ApiProperty({
    example: '1992-03-25',
    description: 'Fecha de nacimiento del jugador',
  })
  @IsDate()
  fechaNacimiento: Date;

  @ApiProperty({
    example: '2010-04-10',
    description: 'Fecha en que fue fichado',
  })
  @IsDate()
  fichado: Date;

  @ApiProperty({
    example: '2012-12-20',
    description: 'Fecha de vigencia del contrato',
  })
  @IsDate()
  @IsOptional()
  contrato?: Date;

  @ApiProperty({
    example: 500000,
    description: 'Valor de mercado en USD',
  })
  @IsNumber()
  @IsPositive()
  valorMercadoUsd: number;
}
