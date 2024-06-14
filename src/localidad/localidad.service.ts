import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocalidadDto } from './dto/create-localidad.dto';
import { UpdateLocalidadDto } from './dto/update-localidad.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import removeAccents from 'remove-accents';

@Injectable()
export class LocalidadService {
  constructor(private prisma: PrismaService) {}

  async create(localidad: Prisma.LocalidadCreateInput) {    
    const {nombre, municipio} = localidad
    const normalLocalidad = removeAccents(nombre.toLocaleLowerCase())
    const localidadExistente = await this.prisma.localidad.findFirst({
      where: {
        municipioId: municipio as any,
        nombre: {
          equals: normalLocalidad,
          mode: 'insensitive'
        }
      }
    })
    if(localidadExistente) {
      throw new BadRequestException(`La localidad '${nombre}' ya existe en el municipio.`);
    }
    return this.prisma.localidad.create({
      data: localidad
    })
  }

  async findAll() {
    return this.prisma.localidad.findMany({});
  }

  async findOne(localidad: Prisma.LocalidadWhereUniqueInput) {
    return this.prisma.localidad.findUnique({
      where: localidad
    })
  }

  async find(where: Prisma.LocalidadWhereUniqueInput) {
    const localidad = await this.prisma.localidad.findUnique({
      where
    });
    if (!localidad) {
      throw new NotFoundException(`Localidad not found`);
    }
    return localidad
  }

  async update(params: {where: Prisma.LocalidadWhereUniqueInput, data: Prisma.LocalidadUpdateInput}) {
    await this.find(params.where)
    const {where, data} = params
    return this.prisma.localidad.update({
      data,
      where
    })
  }

  async remove(where: Prisma.LocalidadWhereUniqueInput) {
    await this.find(where)
    return this.prisma.localidad.delete({
      where
    })
  }
}
