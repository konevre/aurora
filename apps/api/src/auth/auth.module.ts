import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { UsersModule } from "src/users/users.module";

import { SessionsService } from "./sessions/session.service";
import { JwtAccessStrategy } from "./strategies/jwt-access.strategy";
import { JwtRefreshStrategy } from "./strategies/jwt-refresh.strategy";
import { TokensService } from "./tokens/tokens.service";
import { TokenVersionValidator } from "./utils/token-version.validator";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [JwtModule.register({}), ConfigModule, UsersModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtAccessStrategy,
        JwtRefreshStrategy,
        TokensService,
        SessionsService,
        TokenVersionValidator
    ],
    exports: [AuthService]
})
export class AuthModule {}
