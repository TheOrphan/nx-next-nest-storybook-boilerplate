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
    const host = this.configService.get('app.features_service.options.host');
    const port = this.configService.get('app.features_service.options.port');
    const prefix = this.configService.get(
      'app.features_service.options.prefix'
    );
    return firstValueFrom(
      this.httpService.get(`http://${host}:${port}/${prefix}/health`)
    );
  }
}
