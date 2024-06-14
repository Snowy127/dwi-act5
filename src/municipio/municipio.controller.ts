import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MunicipioService } from './municipio.service';
import { CreateMunicipioDto } from './dto/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/update-municipio.dto';

@Controller('municipio')
export class MunicipioController {
  constructor(private readonly municipioService: MunicipioService) {}

  @Post()
  create(@Body() createMunicipioDto: CreateMunicipioDto) {
    return this.municipioService.create(createMunicipioDto as any);
  }

  @Get()
  findAll() {
    return this.municipioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.municipioService.findOne({ id: Number(id) });
  }

  @Get(':id/localidades')
  async getLocalidadesByMunicipiosId(@Param('id') id: number) {
    return this.municipioService.getLocalidadesByMunicipioId({ id: Number(id) });
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMunicipioDto: UpdateMunicipioDto) {
    return this.municipioService.update({ where: { id: Number(id) }, data: updateMunicipioDto });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.municipioService.remove({ id: Number(id) });
  }
}
