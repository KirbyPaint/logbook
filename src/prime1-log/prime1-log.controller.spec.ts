import { Test, TestingModule } from '@nestjs/testing';
import { Prime1LogController } from './prime1-log.controller';
import { Prime1LogService } from './prime1-log.service';

describe('Prime1LogController', () => {
  let controller: Prime1LogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Prime1LogController],
      providers: [Prime1LogService],
    }).compile();

    controller = module.get<Prime1LogController>(Prime1LogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
