import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'tobiasescobar@gmail.com',
    description: 'Correo válido',
    required: true,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @ApiProperty({
    example: 'Tobias Escobar',
    description: 'Nombre completo',
    required: true,
  })
  @IsString()
  @MinLength(3)
  fullName: string;

  @ApiProperty({
    example: 'Contrasegura473',
    description: 'Contraseña válida',
    required: true,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  contrasenha: string;
}
