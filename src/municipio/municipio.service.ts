import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMunicipioDto } from './dto/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/update-municipio.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MunicipioService {
  constructor(private prisma: PrismaService) {}

  async create(municipio: Prisma.MunicipioCreateManyInput) {
    const existingMunicipio = await this.prisma.municipio.findFirst({
      where: {
        estadoId: municipio.estadoId,
        OR: [
          { nombre: municipio.nombre },
          { nombre: municipio.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "") }
        ],
      },
    });
    if (existingMunicipio) {
      throw new Error('El municipio ya existe en este estado');
    }
    const existingEstado = await this.prisma.municipio.findFirst({
      where: {
        estadoId: municipio.estadoId
      },
    });
    if(!existingEstado){
      throw new Error('El estado no existe');
    }
    else{
    return this.prisma.municipio.create({
      data: municipio,
    });
  }
  }

  async findAll() {
    return this.prisma.municipio.findMany({
      include: { estado: true }
    });
  }

  async findOne(municipio: Prisma.MunicipioWhereUniqueInput) {
    const elMunicipio = await this.prisma.municipio.findUnique({
      where: {
        id: municipio.id
      },
      include: { estado: true },
    });

    if (!elMunicipio) {
      throw new NotFoundException('No se encuentra ese municipio!');
    }

    return elMunicipio;
  }

  async getLocalidadesByMunicipioId(municipio: Prisma.MunicipioWhereUniqueInput) {
    const elMunicipio = await this.prisma.municipio.findUnique({
      where: {
        id: municipio.id
      },
      include: { localidades: true },
    });

    if (!elMunicipio) {
      throw new NotFoundException('Municipio no existe');
    }

    return elMunicipio.localidades;
  }

  async update(params: { where: Prisma.MunicipioWhereUniqueInput, data: Prisma.MunicipioUncheckedUpdateInput }) {
    const { where, data } = params;
    const name = String(data.nombre);

    const existingMunicipio = await this.prisma.municipio.findFirst({
      where: {
        OR: [
          { nombre: name },
          { nombre: name.normalize("NFD").replace(/[\u0300-\u036f]/g, "") }
        ],
      },
    });
    if (existingMunicipio) {
      throw new Error('El municipio ya existe en este estado');
    }

      return this.prisma.municipio.update({
        data,
        where: {
          id: where.id
        },
      });
  }
  
  async remove(where: Prisma.MunicipioWhereUniqueInput) {
    return this.prisma.municipio.delete({
      where: {
        id: where.id
      },
    });
  }
}