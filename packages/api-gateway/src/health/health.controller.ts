import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheckService,
  MemoryHealthIndicator,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';
import { ApiFeaturesHealthIndicator } from './api-feature.health';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly diskHealthIndicator: DiskHealthIndicator,
    private readonly memoryHealthIndicator: MemoryHealthIndicator,
    private readonly http: HttpHealthIndicator,
    private readonly healthService: HealthService,
    private readonly apiFeaturesHealthIndicator: ApiFeaturesHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  async checkAll() {
    const featuresPayload = await this.healthService.getCheckHealth();
    return this.healthCheckService.check([
      () => this.http.pingCheck('api-features', 'http://localhost:5001/api'),
      () =>
        this.apiFeaturesHealthIndicator.isHealthy(
          'api-features-detail',
          featuresPayload
        ),
      () =>
        this.http.pingCheck('api-gateway-http-google', 'https://google.co.id'),
      () =>
        this.diskHealthIndicator.checkStorage('api-gateway-disk', {
          thresholdPercent: 0.9,
          path: 'C:/',
        }),
      () =>
        this.memoryHealthIndicator.checkHeap(
          'api-gateway-memory-heap',
          150 * 1024 * 1024
        ),
      () =>
        this.memoryHealthIndicator.checkRSS(
          'api-gateway-memory-rss',
          150 * 1024 * 1024
        ),
    ]);
  }

  @Get('http')
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () =>
        this.http.pingCheck('api-gateway-http-google', 'https://google.co.id'),
    ]);
  }

  @Get('storage')
  @HealthCheck()
  checkDisk() {
    return this.healthCheckService.check([
      () =>
        this.diskHealthIndicator.checkStorage('api-gateway', {
          thresholdPercent: 0.9,
          path: '/',
        }),
    ]);
  }

  @Get('heap')
  @HealthCheck()
  checkMemory() {
    return this.healthCheckService.check([
      () =>
        this.memoryHealthIndicator.checkHeap(
          'api-gateway-memory-heap',
          150 * 1024 * 1024
        ),
      () =>
        this.memoryHealthIndicator.checkRSS(
          'api-gateway-memory-rss',
          150 * 1024 * 1024
        ),
    ]);
  }
}
