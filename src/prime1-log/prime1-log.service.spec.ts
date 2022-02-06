import { Test, TestingModule } from '@nestjs/testing';
import { Prime1LogService } from './prime1-log.service';

describe('Prime1LogService', () => {
  let service: Prime1LogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Prime1LogService],
    }).compile();

    service = module.get<Prime1LogService>(Prime1LogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
