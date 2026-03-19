import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { Venta } from './entities/venta.entity';
import { ProductoDeLaVenta } from '../producto-de-la-venta/entities/producto-de-la-venta.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { TipoDeVenta } from '../tipo-de-venta/entities/tipo-de-venta.entity';
import { TipoDePago } from '../tipo-de-pago/entities/tipo-de-pago.entity';
import { Producto } from '../productos/entities/producto.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Rol } from '../roles/entities/rol.entity';
import { Comision } from '../comisiones/entities/comision.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Venta,
      ProductoDeLaVenta,
      Cliente,
      TipoDeVenta,
      TipoDePago,
      Producto,
      Usuario,
      Rol,
      Comision,
    ]),
  ],
  controllers: [VentasController],
  providers: [VentasService],
  exports: [VentasService],
})
export class VentasModule {}
