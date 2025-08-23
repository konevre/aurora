import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { jwtFromCookie } from '../utils/jwt-from-cookie';
import { SessionsService } from '../sessions/session.service';
import { TokenVersionValidator } from '../utils/token-version.validator';
import { REFRESH_COOKIE } from '../constants/cookies';

type RefreshPayload = { sub: string; username?: string; sid: string; tokenVersion?: number; iat: number; exp: number };

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        private readonly sessionsService: SessionsService,
        private readonly tokenVersionValidator: TokenVersionValidator,
        configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                jwtFromCookie(REFRESH_COOKIE),
            ]),
            secretOrKey: configService.get('JWT_REFRESH_SECRET')!,
            algorithms: [configService.get('JWT_ALGORITHM')!],
            ignoreExpiration: false,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: RefreshPayload) {
        const ok = await this.sessionsService.validate(payload.sid, payload.sub);
        
        if (!ok) {
            throw new UnauthorizedException('Invalid refresh session');
        }

        await this.tokenVersionValidator.assertUpToDate(payload.sub, payload.tokenVersion);

        return { userId: payload.sub, username: payload.username, sid: payload.sid, tokenVersion: payload.tokenVersion };
      }
}