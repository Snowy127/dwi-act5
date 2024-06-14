import { Module } from '@nestjs/common';
import { MunicipioService } from './municipio.service';
import { MunicipioController } from './municipio.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MunicipioController],
  providers: [MunicipioService, PrismaService],
})
export class MunicipioModule {}
