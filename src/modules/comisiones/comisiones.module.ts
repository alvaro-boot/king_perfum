import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comision } from './entities/comision.entity';
import { ComisionesService } from './comisiones.service';
import { ComisionesController } from './comisiones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Comision])],
  controllers: [ComisionesController],
  providers: [ComisionesService],
  exports: [ComisionesService],
})
export class ComisionesModule {}

