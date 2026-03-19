import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comision } from './entities/comision.entity';

@Injectable()
export class ComisionesService {
  constructor(
    @InjectRepository(Comision)
    private readonly comisionRepository: Repository<Comision>,
  ) {}

  async findAll(vendedorId?: number): Promise<Comision[]> {
    const where = vendedorId != null ? { vendedorId } : undefined;

    return this.comisionRepository.find({
      where,
      relations: ['venta', 'vendedor', 'vendedor.rol'],
      order: { fecha: 'DESC' },
    });
  }
}

