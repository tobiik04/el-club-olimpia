import { Module } from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { NoticiasController } from './noticias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Noticia } from './entities/noticia.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [NoticiasController],
  providers: [NoticiasService],
  imports: [TypeOrmModule.forFeature([Noticia]), AuthModule],
  exports: [NoticiasService, TypeOrmModule],
})
export class NoticiasModule {}
