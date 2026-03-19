import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ComisionesService } from './comisiones.service';

@Controller('comisiones')
export class ComisionesController {
  constructor(private readonly comisionesService: ComisionesService) {}

  @Get()
  async findAll(@Query('vendedorId') vendedorId?: string) {
    let parsed: number | undefined;
    if (vendedorId != null && vendedorId !== '') {
      const n = parseInt(vendedorId, 10);
      if (Number.isNaN(n)) throw new BadRequestException('vendedorId inválido');
      parsed = n;
    }
    return this.comisionesService.findAll(parsed);
  }
}

