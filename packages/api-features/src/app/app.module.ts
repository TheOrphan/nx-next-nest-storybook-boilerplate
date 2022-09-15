import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReleaseModule } from '../release/release.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from 'packages/api-features/config/app.config';
import databaseConfig from 'packages/api-features/config/database.config';
import { HealthModule } from '../health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (databaseService: ConfigService) => ({
        type: 'postgres',
        host: databaseService.get('database.host'),
        port: +databaseService.get('database.port'),
        username: databaseService.get('database.username'),
        password: databaseService.get('database.password'),
        database: databaseService.get('database.database'),
      }),
    }),
    ReleaseModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
