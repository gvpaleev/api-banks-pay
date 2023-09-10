import { Module } from '@nestjs/common';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService]
})
export class AuthorizationModule {}
