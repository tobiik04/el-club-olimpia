import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Noticias')
@Controller('noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}

  @ApiResponse({ status: 201, description: 'Noticia creada' })
  @ApiResponse({ status: 500, description: 'Error del servidor' })
  @Post()
  create(@Body() createNoticiaDto: CreateNoticiaDto) {
    return this.noticiasService.createNoticia(createNoticiaDto);
  }

  @ApiResponse({ status: 200, description: 'Noticias encontradas' })
  @ApiResponse({ status: 500, description: 'Error del servidor' })
  @Get()
  findAll() {
    return this.noticiasService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Noticia encontrada' })
  @ApiResponse({ status: 500, description: 'Error del servidor' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noticiasService.findOne(+id);
  }

  @ApiResponse({ status: 200, description: 'Noticia actualizada' })
  @ApiResponse({ status: 500, description: 'Error del servidor' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoticiaDto: UpdateNoticiaDto) {
    return this.noticiasService.updateNoticia(+id, updateNoticiaDto);
  }

  @ApiResponse({ status: 200, description: 'Noticia eliminada' })
  @ApiResponse({ status: 500, description: 'Error del servidor' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noticiasService.removeNoticia(+id);
  }

  @ApiResponse({ status: 200, description: 'Noticias exclusivas encontradas' })
  @ApiResponse({ status: 500, description: 'Error del servidor' })
  @Get('/noticiasExclusivas')
  findNoticiasExclusivas() {
    return this.noticiasService.findNoticiasExclusivas();
  }
}
