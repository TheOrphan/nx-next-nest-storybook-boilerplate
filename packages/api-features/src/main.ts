import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  await app.init();
  const config = app.get(ConfigService);
  const port = config.get('app.port') || 3334;
  await app.listen(port);
  Logger.log(
    `🚀 Api features is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
