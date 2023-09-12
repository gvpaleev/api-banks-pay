import { Test, TestingModule } from '@nestjs/testing';
import { TinkoffPayService } from './tinkoff-pay.service';

describe('TinkoffPayService', () => {
  let service: TinkoffPayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TinkoffPayService],
    }).compile();

    service = module.get<TinkoffPayService>(TinkoffPayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
