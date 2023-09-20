import { Module } from '@nestjs/common';
import { TinkoffPayController } from './tinkoff-pay.controller';
import { TinkoffPayService } from './tinkoff-pay.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [TinkoffPayController],
  providers: [TinkoffPayService]
})
export class TinkoffPayModule {}
