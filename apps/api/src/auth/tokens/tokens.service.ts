import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokensService {
    constructor(
        private jwt: JwtService,
        private configService: ConfigService
    ) {}

    signAccess(
        payload: { sub: string; username?: string; tokenVersion?: number },
        ttlSec: number
    ) {
        return this.jwt.sign(payload, {
            expiresIn: ttlSec,
            secret: this.configService.get("JWT_ACCESS_SECRET"),
            algorithm: this.configService.get("JWT_ALGORITHM")
        });
    }

    signRefresh(
        payload: {
            sub: string;
            username?: string;
            sid: string;
            tokenVersion?: number;
        },
        ttlSec: number
    ) {
        return this.jwt.sign(payload, {
            expiresIn: ttlSec,
            secret: this.configService.get("JWT_REFRESH_SECRET"),
            algorithm: this.configService.get("JWT_ALGORITHM")
        });
    }
}
