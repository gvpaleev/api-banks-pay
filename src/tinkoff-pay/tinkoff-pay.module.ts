import { Module } from '@nestjs/common';
import { TinkoffPayController } from './tinkoff-pay.controller';
import { TinkoffPayService } from './tinkoff-pay.service';

@Module({
  controllers: [TinkoffPayController],
  providers: [TinkoffPayService]
})
export class TinkoffPayModule {}
