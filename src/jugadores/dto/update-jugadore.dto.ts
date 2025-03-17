import { PartialType } from '@nestjs/swagger';
import { CreateJugadoresDto } from './create-jugadore.dto';

export class UpdateJugadoresDto extends PartialType(CreateJugadoresDto) {}
