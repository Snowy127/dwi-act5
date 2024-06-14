import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import removeAccents from 'remove-accents';

@Injectable()
export class ClienteService {
  constructor(private prisma: PrismaService) {}

  async create(cliente: Prisma.ClienteCreateInput) {    
    const { nombre, apellidos, rfc, email } = cliente;

    const normalizedNombre = removeAccents(nombre.toLowerCase());
    const normalizedApellidos = removeAccents(apellidos.toLowerCase());
    
    const clienteExistente = await this.prisma.cliente.findFirst({
      where: {
        OR: [
          {
            AND: [
              { nombre: { equals: normalizedNombre, mode: 'insensitive' } },
              { apellidos: { equals: normalizedApellidos, mode: 'insensitive' } },
            ],
          },
          { rfc: { equals: rfc, mode: 'insensitive' } },
          { email: { equals: email, mode: 'insensitive' } },
        ],
      },
    });

    if (clienteExistente) {
      throw new BadRequestException(`El cliente '${nombre} ${apellidos}' ya existe o el RFC/email está duplicado.`);
    }

    return this.prisma.cliente.create({
      data: cliente,
    });
  }

  async findAll() {
    return this.prisma.cliente.findMany({
      include: {
        direccion: {
          select: {calle: true, numeroExterior: true, numeroInterior: true, cp: true, localidad: { select: {nombre: true, municipio: {select: { nombre:true, estado: { select: { nombre: true}}}}}}}
        }
      }
    });
  }

  async findOne(cliente: Prisma.ClienteWhereUniqueInput) {
    return this.prisma.cliente.findUnique({
      where: cliente,
      include: {
        direccion: {
          select: {calle: true, numeroExterior: true, numeroInterior: true, cp: true, localidad: { select: {nombre: true, municipio: {select: { nombre:true, estado: { select: { nombre: true}}}}}}}
        },
      },
    })
  }

  async find(where: Prisma.ClienteWhereUniqueInput) {
    const cliente = await this.prisma.cliente.findUnique({
      where
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente not found`);
    }
    return cliente
  }

  async update(params: {where: Prisma.ClienteWhereUniqueInput, data: Prisma.ClienteUpdateInput}) {
    await this.find(params.where)
    const {where, data} = params
    return this.prisma.cliente.update({
      data,
      where
    })
  }

  async remove(where: Prisma.ClienteWhereUniqueInput) {
    await this.find(where)
    return this.prisma.cliente.delete({
      where
    })
  }
}
