import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Noticia } from './entities/noticia.entity';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { CreateNoticiaDto } from './dto/create-noticia.dto';

@Injectable()
export class NoticiasService {
  private readonly logger = new Logger(NoticiasService.name);
  constructor(
    @InjectRepository(Noticia)
    private readonly noticiaRepository: Repository<Noticia>,
  ) {}

  async findAll() {
    return this.noticiaRepository.find();
  }

  async findOne(id: number) {
    return this.noticiaRepository.findOne({ where: { id } });
  }

  async createNoticia(createNoticiaDto: CreateNoticiaDto) {
    try {
      const noticia = this.noticiaRepository.create(createNoticiaDto);
      return this.noticiaRepository.save(noticia);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException({
        message: 'Error al crear noticia',
      });
    }
  }

  async removeNoticia(id: number) {
    try {
      await this.noticiaRepository.delete(id);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException({
        message: 'Error al eliminar noticia',
      });
    }
  }

  async updateNoticia(id: number, updateNoticiaDto: UpdateNoticiaDto) {
    try {
      await this.noticiaRepository.update(id, updateNoticiaDto);
      return this.findOne(id);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException({
        message: 'Error al actualizar noticia',
      });
    }
  }

  async findNoticiasExclusivas() {
    try {
      return this.noticiaRepository.find({ where: { exclusiva: true } });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException({
        message: 'Error al buscar noticias exclusivas',
      });
    }
  }
}
