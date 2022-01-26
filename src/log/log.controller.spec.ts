import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { LogController } from './log.controller';
import { LogService } from './log.service';

describe('LogController', () => {
  let controller: LogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogController],
      providers: [LogService, PrismaService],
    }).compile();

    controller = module.get<LogController>(LogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
