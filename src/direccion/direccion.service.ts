import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DireccionService {
  constructor(private prisma: PrismaService) {}

  async create(direccion: Prisma.DireccionCreateInput) {    
    return this.prisma.direccion.create({
      data: direccion
    })
  }

  async findAll() {
    return this.prisma.direccion.findMany({
      include: {
        cliente: true,
        localidad: {
          include: {
            municipio: {
              include: {
                estado: true
              }
            }
          }
        }
      }
    });
  }

  async findOne(direccion: Prisma.DireccionWhereUniqueInput) {
    return this.prisma.direccion.findUnique({
      where: direccion,
      include: {
        cliente: true,
        localidad: {
          include: {
            municipio: {
              include: {
                estado: true
              }
            }
          }
        }
      },
    })
  }

  async find(where: Prisma.DireccionWhereUniqueInput) {
    const direccion = await this.prisma.direccion.findUnique({
      where
    });
    if (!direccion) {
      throw new NotFoundException(`Direccion not found`);
    }
    return direccion
  }

  async update(params: {where: Prisma.DireccionWhereUniqueInput, data: Prisma.DireccionUpdateInput}) {
    await this.find(params.where)
    const {where, data} = params
    return this.prisma.direccion.update({
      data,
      where
    })
  }

  async remove(where: Prisma.DireccionWhereUniqueInput) {
    await this.find(where)
    return this.prisma.direccion.delete({
      where
    })
  }
}
