import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtFromCookie } from '../utils/jwt-from-cookie';
import { TokenVersionValidator } from '../utils/token-version.validator';
import { ACCESS_COOKIE } from '../constants/cookies';

type JwtPayload = { sub: string; username?: string; tokenVersion?: number; iat: number; exp: number };

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
    constructor(
        private readonly tokenVersionValidator: TokenVersionValidator,
        configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                jwtFromCookie(ACCESS_COOKIE),
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            secretOrKey: configService.get('JWT_ACCESS_SECRET')!,
            algorithms: [configService.get('JWT_ALGORITHM')!],
            ignoreExpiration: false,
        });
    }

    async validate(payload: JwtPayload) {
        await this.tokenVersionValidator.assertUpToDate(payload.sub, payload.tokenVersion);
        return { userId: payload.sub, username: payload.username, tokenVersion: payload.tokenVersion };
    }
}