import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import { UpdateUserDto } from './dto/update-auth.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { contrasenha, ...data } = createUserDto;

      const user = await this.userRepository.create({
        ...data,
        contrasenha: bcrypt.hashSync(contrasenha, 10),
      });

      await this.userRepository.save(user);

      delete user.contrasenha;

      return {
        usuario: user,
        token: this.getJwtToken({ correo: user.correo }),
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException({
        message: 'Error al crear usuario',
      });
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { correo, contrasenha } = loginUserDto;

      const user = await this.userRepository.findOne({
        where: { correo },
        select: { id: true, correo: true, contrasenha: true },
      });

      if (!user) throw new UnauthorizedException('Invalid credentials');

      if (!bcrypt.compareSync(contrasenha, user.contrasenha))
        throw new UnauthorizedException('Credenciales invalidas (contraseña)');

      return {
        ...user,
        token: this.getJwtToken({ correo: user.correo }),
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Error al intentar iniciar sesión');
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async update(id: number, updateAuthDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateAuthDto,
    });

    if (!user) throw new BadRequestException('User not found');

    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException({ message: 'Error al actualizar usuario' });
    }
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
