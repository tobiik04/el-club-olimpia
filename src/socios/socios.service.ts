import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateSocioDto } from './dto/create-socio.dto';
import { UpdateSocioDto } from './dto/update-socio.dto';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Socio } from './entities/socio.entity';
import {
  getAsociacionReport,
  IAsociacion,
} from 'src/reports/asociacion.report';
import { PrinterService } from 'src/printer/printer.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class SociosService {
  private readonly logger = new Logger(SociosService.name);
  constructor(
    @InjectRepository(Socio)
    private readonly sociosRepository: Repository<Socio>,

    private readonly dataSource: DataSource,
    private readonly printerService: PrinterService,
  ) {}

  async createSocio(createSocioDto: CreateSocioDto, user: User) {
    this.validateSocioFields(createSocioDto);
    try {
      const socio = this.sociosRepository.create({
        ...createSocioDto,
        user,
      });

      return await this.sociosRepository.save(socio);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error al crear socio',
      });
    }
  }

  async updateSocio(
    id: number,
    updateSocioDto: UpdateSocioDto,
  ): Promise<Socio> {
    const socio = await this.sociosRepository.preload({
      id,
      ...updateSocioDto,
    });

    if (!socio) {
      throw new NotFoundException(`Socio con id ${id} no encontrado`);
    }

    try {
      return await this.sociosRepository.save(socio);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  validateSocioFields(createSocioDto: CreateSocioDto) {
    const fechaActual = new Date();
    const fechaNacimiento = new Date(createSocioDto.fechaNacimiento);

    const mes = fechaActual.getMonth() - fechaNacimiento.getMonth();
    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

    if (
      mes < 0 ||
      (mes === 0 && fechaActual.getDate() < fechaNacimiento.getDate())
    ) {
      edad--;
    }

    if (edad < 18) {
      throw new BadRequestException('El socio debe ser mayor de 18 años');
    }

    if (createSocioDto.tipo === 'socio-infantil' && edad >= 18) {
      throw new BadRequestException(
        'El socio infantil debe ser menor de 18 años',
      );
    }
  }

  async getSocios(): Promise<Socio[]> {
    try {
      return this.sociosRepository.find({ where: { activo: true } });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException({
        message: 'Error al obtener socios',
      });
    }
  }

  async removeSocio(id: number): Promise<Socio> {
    const socio = await this.sociosRepository.findOne({ where: { id } });
    if (!socio || !socio.activo) {
      throw new NotFoundException(`Socio con id ${id} no encontrado`);
    }
    socio.activo = false;

    try {
      return await this.sociosRepository.save(socio);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException({
        message: 'Error al eliminar socio',
      });
    }
  }

  async asociacionReport(id: number) {
    const socio = await this.sociosRepository.findOneBy({ id });

    if (!socio || !socio.activo)
      throw new NotFoundException(`Socio con id ${id} no encontrado`);

    const docDefinition = getAsociacionReport({
      socio: socio.user.nombreCompleto,
      nroSocio: socio.id,
      fechaAsociacion: socio.fechaAsociacion,
    });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  private handleExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException('Error inesperado');
  }
}
