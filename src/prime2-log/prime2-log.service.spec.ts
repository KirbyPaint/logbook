import { Test, TestingModule } from '@nestjs/testing';
import { Prime2LogService } from './prime2-log.service';

describe('Prime2LogService', () => {
  let service: Prime2LogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Prime2LogService],
    }).compile();

    service = module.get<Prime2LogService>(Prime2LogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
