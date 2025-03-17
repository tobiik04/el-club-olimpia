import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JugadoresModule } from 'src/jugadores/jugadores.module';
import { NoticiasModule } from 'src/noticias/noticias.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [AuthModule, JugadoresModule, NoticiasModule],
})
export class SeedModule {}
