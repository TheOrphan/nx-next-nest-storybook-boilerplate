import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from '../config/app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { HealthModule } from '../health/health.module';
import { ReleaseModule } from '../api-feature/release/release.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig],
    }),
    AuthModule,
    UsersModule,
    HealthModule,
    ReleaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
