import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateJugadoresDto } from './dto/create-jugadore.dto';
import { UpdateJugadoresDto } from './dto/update-jugadore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Jugadores } from './entities/jugadores.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class JugadoresService {
  constructor(
    @InjectRepository(Jugadores)
    private readonly jugadoresRepository: Repository<Jugadores>,
  ) {}

  create(createJugadoreDto: CreateJugadoresDto) {
    try {
      const jugador = this.jugadoresRepository.create(createJugadoreDto);

      console.log('inserto uno');

      return this.jugadoresRepository.save(jugador);
    } catch {
      throw new InternalServerErrorException(
        'No se pudo crear el jugador, intente nuevamente',
      );
    }
  }

  findAll() {
    return this.jugadoresRepository.find({
      select: [
        'nombre',
        'apellido',
        'edad',
        'numero',
        'nacionalidad',
        'fechaNacimiento',
        'fichado',
        'contrato',
        'valorMercadoUsd',
      ],
    });
  }

  findOne(id: number) {
    const jugador = this.jugadoresRepository.findOneBy({ id });

    if (!jugador)
      throw new NotFoundException(`Jugador con id ${id} no encontrado`);

    return jugador;
  }

  async update(id: number, updateJugadoreDto: UpdateJugadoresDto) {
    const jugador = await this.jugadoresRepository.preload({
      id,
      ...updateJugadoreDto,
    });

    if (!jugador)
      throw new NotFoundException(`Jugador con id ${id} no encontrado`);

    await this.jugadoresRepository.save(jugador);

    return { ...jugador };
  }

  async remove(id: number) {
    const jugador = await this.jugadoresRepository.findOneBy({ id });

    await this.jugadoresRepository.remove(jugador);

    return `Jugador con id ${id} eliminado`;
  }

  async deleteAll() {
    const query = this.jugadoresRepository.createQueryBuilder();

    try {
      return await query.delete().where({}).execute();
    } catch {
      throw new InternalServerErrorException(
        'No se pudo eliminar los jugadores',
      );
    }
  }
}
