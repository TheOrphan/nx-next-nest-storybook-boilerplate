import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('API Feature - Release')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('release')
export class ReleaseController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  private API_FEATURE = this.configService.get('app.features_service');

  @Post()
  create(@Body() body): Promise<AxiosResponse<any>> {
    return firstValueFrom(this.httpService.get(`${this.API_FEATURE}/health`));
  }

  @Get()
  findAll(): Promise<AxiosResponse<any>> {
    return firstValueFrom(this.httpService.get(`${this.API_FEATURE}/release`));
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<AxiosResponse<any>> {
    // return this.httpService.findOne(+id);
    return firstValueFrom(this.httpService.get(`${this.API_FEATURE}/health`));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body): Promise<AxiosResponse<any>> {
    // return this.httpService.update(+id, body);
    return firstValueFrom(this.httpService.get(`${this.API_FEATURE}/health`));
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<AxiosResponse<any>> {
    // return this.httpService.remove(+id);
    return firstValueFrom(this.httpService.get(`${this.API_FEATURE}/health`));
  }
}
