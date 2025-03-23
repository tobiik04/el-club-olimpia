import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Socio } from 'src/socios/entities/socio.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SocioGuard implements CanActivate {
  constructor(
    @InjectRepository(Socio)
    private readonly socioRepository: Repository<Socio>,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    if (!user) throw new NotFoundException('Usuario no encontrado');

    const socio = await this.socioRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    if (!socio) throw new NotFoundException('Socio no encontrado');

    return true;
  }
}
