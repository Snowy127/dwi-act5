import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocalidadModule } from './localidad/localidad.module';
import { ClienteModule } from './cliente/cliente.module';
import { DireccionModule } from './direccion/direccion.module';

@Module({
  imports: [LocalidadModule, ClienteModule, DireccionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
