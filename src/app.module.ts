import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayMoneroModule } from './pay-monero/pay-monero.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { TinkoffPayModule } from './tinkoff-pay/tinkoff-pay.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),
    TinkoffPayModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
