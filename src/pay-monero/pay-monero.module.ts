import { Module } from '@nestjs/common';
import { PayMoneroController } from './pay-monero.controller';
import { PayMoneroService } from './pay-monero.service';

@Module({
  controllers: [PayMoneroController],
  providers: [PayMoneroService]
})
export class PayMoneroModule {}
