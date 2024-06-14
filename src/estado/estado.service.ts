import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EstadoService {
  constructor( private prisma: PrismaService ){}
  async create(estado: Prisma.EstadoCreateInput) {
    const existingEstado = await this.prisma.estado.findFirst({
      where: {
        OR: [
          { nombre: estado.nombre },
          { nombre: estado.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "") }
        ],
      },
    });
    if (existingEstado) {
      throw new Error('El estado ya existe');
    }
    return this.prisma.estado.create({
      data: estado
    })
  }

  async findAll() {
    return this.prisma.estado.findMany({
      include: { municipios: true }
    })
  }

  async findOne(estado: Prisma.EstadoWhereUniqueInput) {
      const elEstado = await this.prisma.estado.findUnique({
        where: {
          id: estado.id
        },
        include: { municipios: true },
      });
      if(!elEstado){
        throw new NotFoundException('No se encuentra ese estado!');
      }
      return elEstado;
  }

  async getMunicipiosByEstadoId(estado: Prisma.EstadoWhereUniqueInput) {
    const elEstado = await this.prisma.estado.findUnique({
      where: {
        id: estado.id
      },
      include: { municipios: true },
    });
    if (!elEstado) {
      throw new NotFoundException('Estado no existe');
    }
    return elEstado.municipios;
  }

  async update(params: { where: Prisma.EstadoWhereUniqueInput, data: Prisma.EstadoUpdateInput }) {
    const { where, data } = params;
    const name = String(data.nombre);
    const existingEstado = await this.prisma.estado.findFirst({
      where: {
        OR: [
          { nombre: name },
          { nombre: name.normalize("NFD").replace(/[\u0300-\u036f]/g, "") }
        ],
      },
    });
    if (existingEstado && existingEstado.id !== where.id) {
      throw new Error('Ya existe un estado con este nombre');
    }

    return this.prisma.estado.update({
      data,
      where: {
        id: where.id
      },
    });
  }

  async remove(where: Prisma.EstadoWhereUniqueInput) {
    return this.prisma.estado.delete({
      where: {
        id: where.id
      },
    });
  }
}
