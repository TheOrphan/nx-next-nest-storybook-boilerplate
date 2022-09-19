import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app/app.module';
import { ReleaseModule } from './release/release.module';
import { swagRelease } from './release/release.swagger';
import { HealthModule } from './health/health.module';
import { swagHealth } from './health/health.swagger';
import { AllExceptionsFilter } from '@boilerplate-project/nest-util-lib';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get('app.port');
  const version = config.get('app.version');
  const prefix = config.get('app.prefix');
  const mode = config.get('app.mode');
  const globalPrefix = `${prefix}/${version}`;
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new AllExceptionsFilter());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors();
  if (mode === 'development') {
    const defaultOptions = new DocumentBuilder()
      .setTitle('Boilerplate API Documentation')
      .setVersion(version)
      .build();

    const defaultSwagger = SwaggerModule.createDocument(app, defaultOptions);
    SwaggerModule.setup(`${globalPrefix}/doc`, app, defaultSwagger);

    const health = SwaggerModule.createDocument(app, swagHealth, {
      include: [HealthModule],
    });
    SwaggerModule.setup(`${globalPrefix}/doc/health`, app, health);

    const releases = SwaggerModule.createDocument(app, swagRelease, {
      include: [ReleaseModule],
    });
    SwaggerModule.setup(`${globalPrefix}/doc/release`, app, releases);
  }

  await app.listen(port);
  const logger = new Logger('bootstrap');
  logger.log(
    `🚀 Api features is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
