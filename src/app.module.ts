import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocalidadModule } from './localidad/localidad.module';

@Module({
  imports: [LocalidadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
