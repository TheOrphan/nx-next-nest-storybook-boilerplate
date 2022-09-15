import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheckService,
  MemoryHealthIndicator,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly diskHealthIndicator: DiskHealthIndicator,
    private readonly memoryHealthIndicator: MemoryHealthIndicator,
    private readonly http: HttpHealthIndicator,
    private readonly db: TypeOrmHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  checkAll() {
    return this.healthCheckService.check([
      () => this.db.pingCheck('api-features-database'),
      () =>
        this.http.pingCheck('api-features-http-google', 'https://google.co.id'),
      () =>
        this.diskHealthIndicator.checkStorage('api-features-disk', {
          thresholdPercent: 0.9,
          path: 'C:/',
        }),
      () =>
        this.memoryHealthIndicator.checkHeap(
          'api-features-memory-heap',
          150 * 1024 * 1024
        ),
      () =>
        this.memoryHealthIndicator.checkRSS(
          'api-features-memory-rss',
          150 * 1024 * 1024
        ),
    ]);
  }

  @Get('db')
  @HealthCheck()
  checkDb() {
    return this.healthCheckService.check([
      () => this.db.pingCheck('api-features-database'),
    ]);
  }

  @Get('http')
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () =>
        this.http.pingCheck('api-features-http-google', 'https://google.co.id'),
    ]);
  }

  @Get('storage')
  @HealthCheck()
  checkDisk() {
    return this.healthCheckService.check([
      () =>
        this.diskHealthIndicator.checkStorage('api-features', {
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
          'api-features-memory-heap',
          150 * 1024 * 1024
        ),
      () =>
        this.memoryHealthIndicator.checkRSS(
          'api-features-memory-rss',
          150 * 1024 * 1024
        ),
    ]);
  }
}
