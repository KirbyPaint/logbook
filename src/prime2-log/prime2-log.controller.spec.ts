import { Test, TestingModule } from '@nestjs/testing';
import { Prime2LogController } from './prime2-log.controller';
import { Prime2LogService } from './prime2-log.service';

describe('Prime2LogController', () => {
  let controller: Prime2LogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Prime2LogController],
      providers: [Prime2LogService],
    }).compile();

    controller = module.get<Prime2LogController>(Prime2LogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
