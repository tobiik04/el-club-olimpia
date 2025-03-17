import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Socio } from 'src/socios/entities/socio.entity';

@Injectable()
export class SocioGuard implements CanActivate {
  constructor(
    private readonly dataSource: DataSource,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    if (!user) throw new NotFoundException('Usuario no encontrado');

    const socio = await this.dataSource.getRepository(Socio).findOne({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    return true;
  }
}
