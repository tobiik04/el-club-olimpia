import { Module } from '@nestjs/common';
import { SociosService } from './socios.service';
import { SociosController } from './socios.controller';
import { Socio } from './entities/socio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PrinterModule } from 'src/printer/printer.module';

@Module({
  controllers: [SociosController],
  providers: [SociosService],
  imports: [TypeOrmModule.forFeature([Socio]), AuthModule, PrinterModule],
  exports: [SociosService, TypeOrmModule],
})
export class SociosModule {}
