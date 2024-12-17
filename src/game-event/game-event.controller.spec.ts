import { Test, TestingModule } from '@nestjs/testing';
import { GameEventController } from './game-event.controller';

describe('GameEventController', () => {
  let controller: GameEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameEventController],
    }).compile();

    controller = module.get<GameEventController>(GameEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
