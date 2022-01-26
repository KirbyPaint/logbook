import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { LogService } from './log.service';

describe('LogService', () => {
  let service: LogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogService, PrismaService],
    }).compile();

    service = module.get<LogService>(LogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
