import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DireccionService } from './direccion.service';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';

@Controller('direccion')
export class DireccionController {
  constructor(private readonly direccionService: DireccionService) {}

  @Post()
  create(@Body() createDireccionDto: CreateDireccionDto) {
    return this.direccionService.create(createDireccionDto as any);
  }

  @Get()
  findAll() {
    return this.direccionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.direccionService.findOne({id});
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDireccionDto: UpdateDireccionDto) {
    return this.direccionService.update({
      where: {id},
      data: updateDireccionDto
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.direccionService.remove({id});
  }
}
