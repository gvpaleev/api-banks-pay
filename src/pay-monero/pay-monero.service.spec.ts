import { Test, TestingModule } from '@nestjs/testing';
import { PayMoneroService } from './pay-monero.service';

describe('PayMoneroService', () => {
  let service: PayMoneroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayMoneroService],
    }).compile();

    service = module.get<PayMoneroService>(PayMoneroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
