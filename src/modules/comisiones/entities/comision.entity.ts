import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Venta } from '../../ventas/entities/venta.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('comisiones')
export class Comision {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'venta_id' })
  ventaId: number;

  @Column({ type: 'int', name: 'vendedor_id' })
  vendedorId: number;

  @Column({ type: 'int', name: 'porcentaje' })
  porcentaje: number;

  @Column({ type: 'int', name: 'valor_comision' })
  valorComision: number;

  @Column({
    type: 'timestamp',
    name: 'fecha',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha: Date;

  @ManyToOne(() => Venta)
  @JoinColumn({ name: 'venta_id' })
  venta: Venta;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'vendedor_id' })
  vendedor: Usuario;
}

