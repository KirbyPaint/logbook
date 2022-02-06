import { Test, TestingModule } from '@nestjs/testing';
import { Prime3LogController } from './prime3-log.controller';
import { Prime3LogService } from './prime3-log.service';

describe('Prime3LogController', () => {
  let controller: Prime3LogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Prime3LogController],
      providers: [Prime3LogService],
    }).compile();

    controller = module.get<Prime3LogController>(Prime3LogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
