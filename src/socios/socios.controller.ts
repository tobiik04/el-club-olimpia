import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SociosService } from './socios.service';
import { CreateSocioDto } from './dto/create-socio.dto';
import { UpdateSocioDto } from './dto/update-socio.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SocioGuard } from 'src/auth/guards/socio-role.guard';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { UserRoleGuard } from 'src/auth/guards/user-role.guard';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';

@ApiTags('Socios')
@Controller('socios')
export class SociosController {
  constructor(private readonly sociosService: SociosService) {}

  @ApiResponse({ status: 201, description: 'Socio creado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  @ApiResponse({ status: 500, description: 'Error del servidor' })
  @Post('asociarse')
  asociarse(
    @Body() createSocioDto: CreateSocioDto,
    @GetUser() user: User,
    @Res() response: Response,
  ) {
    return this.sociosService.createSocio(createSocioDto, user);
  }

  @ApiResponse({ status: 200, description: 'Socios encontrados' })
  @ApiResponse({ status: 500, description: 'Error del servidor' })
  @Get()
  getSocios() {
    return this.sociosService.getSocios();
  }

  @UseGuards(AuthGuard())
  @RoleProtected(ValidRoles.administrador)
  @ApiResponse({ status: 200, description: 'Socio actualizado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  @ApiResponse({ status: 500, description: 'Error del servidor' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSocioDto: UpdateSocioDto) {
    return this.sociosService.updateSocio(+id, updateSocioDto);
  }

  @UseGuards(AuthGuard())
  @RoleProtected(ValidRoles.administrador)
  @ApiResponse({ status: 200, description: 'Socio eliminado' })
  @ApiResponse({ status: 500, description: 'Error del servidor' })
  @Patch(':id')
  remove(@Param('id') id: string) {
    return this.sociosService.removeSocio(+id);
  }

  @ApiOperation({
    summary: 'Generar reporte de solicitud de asociación en formato PDF',
  })
  @Get('asociacionReporte')
  @UseGuards(AuthGuard(), SocioGuard)
  @RoleProtected(ValidRoles.socio)
  async asociacionReport(@Res() response: Response) {
    const pdfDoc = await this.sociosService.asociacionReport(2);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Solicitud de Asociación';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
