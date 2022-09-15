import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';

@Injectable()
export class ApiFeaturesHealthIndicator extends HealthIndicator {
  async isHealthy(key: string, payload: any): Promise<HealthIndicatorResult> {
    const checkHealth = payload.data;
    const isHealthy = payload.status === 200;
    const result = this.getStatus(key, isHealthy, checkHealth);

    if (isHealthy) {
      return result;
    }
    throw new HealthCheckError('Api Features Health failed', result);
  }
}
