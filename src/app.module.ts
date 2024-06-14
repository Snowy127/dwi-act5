import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocalidadModule } from './localidad/localidad.module';
import { ClienteModule } from './cliente/cliente.module';

@Module({
  imports: [LocalidadModule, ClienteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
