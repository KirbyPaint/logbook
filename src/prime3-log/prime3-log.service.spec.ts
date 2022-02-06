import { Test, TestingModule } from '@nestjs/testing';
import { Prime3LogService } from './prime3-log.service';

describe('Prime3LogService', () => {
  let service: Prime3LogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Prime3LogService],
    }).compile();

    service = module.get<Prime3LogService>(Prime3LogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
