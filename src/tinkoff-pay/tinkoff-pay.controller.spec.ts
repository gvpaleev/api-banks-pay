import { Test, TestingModule } from '@nestjs/testing';
import { TinkoffPayController } from './tinkoff-pay.controller';

describe('TinkoffPayController', () => {
  let controller: TinkoffPayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TinkoffPayController],
    }).compile();

    controller = module.get<TinkoffPayController>(TinkoffPayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
