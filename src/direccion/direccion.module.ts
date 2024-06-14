import { Module } from '@nestjs/common';
import { DireccionService } from './direccion.service';
import { DireccionController } from './direccion.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DireccionController],
  providers: [DireccionService, PrismaService],
})
export class DireccionModule {}
