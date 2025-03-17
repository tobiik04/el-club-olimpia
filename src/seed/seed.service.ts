import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Jugadores } from 'src/jugadores/entities/jugadores.entity';
import { JugadoresService } from 'src/jugadores/jugadores.service';
import { Repository } from 'typeorm';
import { noticias, seedData } from './data/seed-data';
import { NoticiasService } from 'src/noticias/noticias.service';
import { Noticia } from 'src/noticias/entities/noticia.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Jugadores)
    private readonly jugadoresRepository: Repository<Jugadores>,

    @InjectRepository(Noticia)
    private readonly noticiasRepository: Repository<Noticia>,

    private readonly jugadoresService: JugadoresService,
    private readonly noticiasService: NoticiasService,
  ) {}

  async seed() {
    await this.jugadoresService.deleteAll();

    Promise.all([this.insertJugadores(), this.insertNoticias()]);

    return 'Seed Executed';
  }

  async insertJugadores() {
    const seedJugadores = seedData;

    const insertJugadores = [];

    seedJugadores.forEach((jugador) => {
      insertJugadores.push(this.jugadoresService.create(jugador));
    });

    await Promise.all(insertJugadores);
  }

  async insertNoticias() {
    const seedNoticias = noticias;

    const insertNoticias = seedNoticias.map((noticia) =>
      this.noticiasService.createNoticia(noticia),
    );

    await Promise.all(insertNoticias);
  }

  async deleteEntities() {
    const queryB1 = this.jugadoresRepository.createQueryBuilder();
    const queryB2 = this.noticiasRepository.createQueryBuilder();

    Promise.all([
      queryB1.delete().where({}).execute(),
      queryB2.delete().where({}).execute(),
    ]);
  }
}
