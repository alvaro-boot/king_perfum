import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigins = new Set([
    'https://king-front.onrender.com',
    // También permitimos el propio dominio del front en producción si lo usas.
    'https://king-front.onrender.com/',
  ]);
  // Middleware CORS explícito para evitar inconsistencias en preflight
  // (especialmente cuando el backend está detrás de proxies/edge).
  app.use((req, res, next) => {
    const requestOrigin = req.headers.origin;
    const origin =
      typeof requestOrigin === 'string' && allowedOrigins.has(requestOrigin)
        ? requestOrigin
        : '*';

    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    );
    res.setHeader('Access-Control-Max-Age', '86400');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  // También dejamos enableCors por compatibilidad con Nest/strategies internas.
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.has(origin)) return callback(null, true);
      return callback(null, false);
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
