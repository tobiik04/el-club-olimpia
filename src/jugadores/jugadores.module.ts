import { Module } from '@nestjs/common';
import { JugadoresService } from './jugadores.service';
import { JugadoresController } from './jugadores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jugadores } from './entities/jugadores.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [JugadoresController],
  providers: [JugadoresService],
  imports: [TypeOrmModule.forFeature([Jugadores]), AuthModule],
  exports: [JugadoresService, TypeOrmModule],
})
export class JugadoresModule {}
