import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HttpModule } from '@nestjs/axios';
import { ApiFeaturesHealthIndicator } from './api-feature.health';
import { ConfigModule } from '@nestjs/config';
import { HealthService } from './health.service';

@Module({
  imports: [TerminusModule, HttpModule, ConfigModule],
  controllers: [HealthController],
  providers: [HealthService, ApiFeaturesHealthIndicator],
})
export class HealthModule {}
