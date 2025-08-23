import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { TokensService } from './tokens/tokens.service';
import { SessionsService } from './sessions/session.service';
import { TokenVersionValidator } from './utils/token-version.validator';

@Module({
  imports: [JwtModule.register({}), ConfigModule, UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService, 
    JwtAccessStrategy, 
    JwtRefreshStrategy, 
    TokensService, 
    SessionsService,
    TokenVersionValidator,
  ],
  exports: [AuthService],
})
export class AuthModule {}
