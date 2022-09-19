import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReleaseController } from './release.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [ReleaseController],
})
export class ReleaseModule {}
