import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @ApiResponse({ status: 200, description: 'Seed ejecutado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  @ApiResponse({ status: 500, description: 'Error del servidor' })
  @Get()
  async runSeed() {
    this.seedService.seed();
  }
}
