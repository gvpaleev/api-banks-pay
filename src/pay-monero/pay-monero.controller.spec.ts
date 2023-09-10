import { Test, TestingModule } from '@nestjs/testing';
import { PayMoneroController } from './pay-monero.controller';

describe('PayMoneroController', () => {
  let controller: PayMoneroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayMoneroController],
    }).compile();

    controller = module.get<PayMoneroController>(PayMoneroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
