import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth.controller';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { ClientesModule } from './modules/clientes/clientes.module';
import { AbonosModule } from './modules/abonos/abonos.module';
import { ProductosModule } from './modules/productos/productos.module';
import { RolesModule } from './modules/roles/roles.module';
import { TipoDeVentaModule } from './modules/tipo-de-venta/tipo-de-venta.module';
import { TipoDePagoModule } from './modules/tipo-de-pago/tipo-de-pago.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { VentasModule } from './modules/ventas/ventas.module';
import { ProductoDeLaVentaModule } from './modules/producto-de-la-venta/producto-de-la-venta.module';
import { ComisionesModule } from './modules/comisiones/comisiones.module';

type PostgresConnectionConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

function resolvePostgresConnection(): PostgresConnectionConfig {
  const defaultConfig: PostgresConnectionConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'king_perfum',
  };

  // Soporta configurar la BD con una URL completa tipo:
  // postgresql://usuario:password@host:puerto/base
  const rawDbHost = process.env.DB_HOST;
  const databaseUrl =
    process.env.DATABASE_URL ||
    (rawDbHost && /^postgres(ql)?:\/\//i.test(rawDbHost) ? rawDbHost : undefined);

  if (!databaseUrl) return defaultConfig;

  const parsed = new URL(databaseUrl);
  const portFromUrl = parsed.port ? parseInt(parsed.port, 10) : undefined;
  const databaseFromUrl = parsed.pathname ? parsed.pathname.replace(/^\//, '') : '';

  return {
    host: parsed.hostname || defaultConfig.host,
    port: portFromUrl ?? defaultConfig.port,
    username: parsed.username || defaultConfig.username,
    password: parsed.password || defaultConfig.password,
    database: databaseFromUrl || defaultConfig.database,
  };
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...resolvePostgresConnection(),
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    }),
    CategoriaModule,
    ClientesModule,
    AbonosModule,
    ProductosModule,
    RolesModule,
    TipoDeVentaModule,
    TipoDePagoModule,
    UsuariosModule,
    VentasModule,
    ProductoDeLaVentaModule,
    ComisionesModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
