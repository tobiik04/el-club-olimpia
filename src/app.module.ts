import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Jugadores } from './jugadores/entities/jugadores.entity';
import { JugadoresModule } from './jugadores/jugadores.module';
import { AuthModule } from './auth/auth.module';
import { SociosModule } from './socios/socios.module';
import { SeedModule } from './seed/seed.module';
import { PrinterModule } from './printer/printer.module';
import { NoticiasModule } from './noticias/noticias.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    JugadoresModule,

    AuthModule,

    SociosModule,

    SeedModule,

    PrinterModule,

    NoticiasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
