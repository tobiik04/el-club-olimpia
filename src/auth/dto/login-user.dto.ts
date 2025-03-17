import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'tobias12@gmail.com',
    description: 'Correo del usuario',
    required: true,
  })
  @IsString()
  @IsEmail()
  correo: string;

  @ApiProperty({
    example: 'Contrasegura473',
    description: 'Contraseña del usuario',
    required: true,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número o un caracter especial',
  })
  contrasenha: string;
}
