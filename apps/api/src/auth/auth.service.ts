import { Injectable } from '@nestjs/common';
import { TokensService } from './tokens/tokens.service';
import { SessionsService } from './sessions/session.service';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { isProd } from 'src/config/env';
import { ACCESS_COOKIE, REFRESH_COOKIE } from './constants/cookies';

@Injectable()
export class AuthService {
    constructor(
        private readonly tokensService: TokensService,
        private readonly sessionsService: SessionsService,
        private readonly configService: ConfigService
    ) {}    

    async signIn(user: { id: string; username?: string; tokenVersion?: number }, meta: { ua?: string; ip?: string }) {
        const refreshTtlSec = parseInt(this.configService.get('JWT_REFRESH_TTL_SEC')!);
        const accessTtlSec  = parseInt(this.configService.get('JWT_ACCESS_TTL_SEC')!);
    
        const session = await this.sessionsService.create(user.id, { ua: meta.ua, ip: meta.ip, ttlMs: refreshTtlSec * 1000 });
        const access  = this.tokensService.signAccess({ sub: user.id, username: user.username, tokenVersion: user.tokenVersion }, accessTtlSec);
        const refresh = this.tokensService.signRefresh({ sub: user.id, sid: session.id, tokenVersion: user.tokenVersion }, refreshTtlSec);
    
        return { access, refresh, accessTtlMs: accessTtlSec * 1000, refreshTtlMs: refreshTtlSec * 1000 };
    }

    async signOut(sid: string) {
        await this.sessionsService.revoke(sid);
    }

    async refresh(principal: { userId: string; username?: string; sid: string; tokenVersion?: number }) {
        const accessTtlSec  = parseInt(this.configService.get('JWT_ACCESS_TTL_SEC')!);
        const access  = this.tokensService.signAccess({ sub: principal.userId, username: principal.username, tokenVersion: principal.tokenVersion }, accessTtlSec);
        return { access, accessTtlMs: accessTtlSec * 1000 };
    }

    setAuthCookies(response: Response, tokens: { access?: string; refresh?: string; accessTtlMs?: number; refreshTtlMs?: number }) {
        
        if (tokens.access) {
            response.cookie(ACCESS_COOKIE, tokens.access, {
                httpOnly: true,
                secure: isProd,
                sameSite: 'lax',
                path: '/',
                maxAge: tokens.accessTtlMs,
            });
        }

        if (tokens.refresh) {
            response.cookie(REFRESH_COOKIE, tokens.refresh, {
                httpOnly: true,
                secure: isProd,
                sameSite: 'lax',
                path: '/auth',
                maxAge: tokens.refreshTtlMs,
            });
        }
    }

    clearAuthCookies(response: Response) {
        response.clearCookie(ACCESS_COOKIE, { path: '/' });
        response.clearCookie(REFRESH_COOKIE, { path: '/auth' });
    }
}
