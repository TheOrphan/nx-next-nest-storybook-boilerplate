import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';

import { HealthController } from './health.controller';

describe('HealthController', () => {
  let service: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule],
      providers: [HealthController],
    }).compile();

    service = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
