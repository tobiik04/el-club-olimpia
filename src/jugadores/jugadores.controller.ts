import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JugadoresService } from './jugadores.service';
import { CreateJugadoresDto } from './dto/create-jugadore.dto';
import { UpdateJugadoresDto } from './dto/update-jugadore.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Jugadores')
@Controller('jugadores')
export class JugadoresController {
  constructor(private readonly jugadoresService: JugadoresService) {}

  @Post()
  create(@Body() createJugadoreDto: CreateJugadoresDto) {
    return this.jugadoresService.create(createJugadoreDto);
  }

  @Get('getAll')
  findAll() {
    return this.jugadoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jugadoresService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJugadoreDto: UpdateJugadoresDto,
  ) {
    return this.jugadoresService.update(+id, updateJugadoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jugadoresService.remove(+id);
  }
}
