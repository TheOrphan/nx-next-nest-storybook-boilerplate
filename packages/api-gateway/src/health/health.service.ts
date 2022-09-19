import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HealthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  getCheckHealth(): Promise<AxiosResponse<any>> {
    const API_FEATURE = this.configService.get('app.features_service');
    return firstValueFrom(this.httpService.get(`${API_FEATURE}/health`));
  }
}
