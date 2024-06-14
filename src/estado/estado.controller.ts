import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoService } from './estado.service';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';

@Controller('estado')
export class EstadoController {
  constructor(private readonly estadoService: EstadoService) {}

  @Post()
  create(@Body() createEstadoDto: CreateEstadoDto) {
    return this.estadoService.create(createEstadoDto);
  }

  @Get()
  findAll() {
    return this.estadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.estadoService.findOne({ id: Number(id) });
  }

  @Get(':id/municipios')
  async getMunicipiosByEstadoId(@Param('id') id: number) {
    return this.estadoService.getMunicipiosByEstadoId({ id: Number(id) });
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEstadoDto: UpdateEstadoDto) {
    return this.estadoService.update({ where: { id: Number(id) }, data: updateEstadoDto });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.estadoService.remove({ id: Number(id) });
  }
}
