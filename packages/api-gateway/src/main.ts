import { AllExceptionsFilter } from '@boilerplate-project/nest-util-lib';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get('app.port');
  const prefix = config.get('app.prefix');
  const version = config.get('app.version');
  const globalPrefix = `${prefix}/${version}`;
  const mode = config.get('app.mode');
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new AllExceptionsFilter());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  /**
   * Enable Cors di sini lebih baik daripada setup di file htaccess
   * Karena kalau di htaccess, bisa banyak error dan berbeda
   * So disable cors yang di htaccess
   */
  app.enableCors();
  if (mode === 'development') {
    const defaultOptions = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Boilerplate API Documentation')
      .setVersion(version)
      .build();

    const defaultSwagger = SwaggerModule.createDocument(app, defaultOptions);
    SwaggerModule.setup(`${globalPrefix}/doc`, app, defaultSwagger);
  }
  await app.listen(port);
  const logger = new Logger('bootstrap');
  logger.log(
    `🚀 Api gateway is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
