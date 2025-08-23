import { vi } from "vitest";
vi.mock("src/config/env", () => ({ isProd: false }));

import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import { beforeEach, describe, expect, it } from "vitest";

import { AuthService } from "src/auth/auth.service";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "src/auth/constants/cookies";

class TokensServiceMock {
    signAccess = vi.fn();
    signRefresh = vi.fn();
}

class SessionsServiceMock {
    create = vi.fn();
    revoke = vi.fn();
}

describe("AuthService", () => {
    let tokens: TokensServiceMock;
    let sessions: SessionsServiceMock;
    let config: ConfigService;
    let service: AuthService;

    beforeEach(() => {
        tokens = new TokensServiceMock();
        sessions = new SessionsServiceMock();
        config = {
            get: vi.fn((key: string) => {
                if (key === "JWT_REFRESH_TTL_SEC") return "120";
                if (key === "JWT_ACCESS_TTL_SEC") return "60";
                return undefined;
            })
        } as unknown as ConfigService;

        service = new AuthService(tokens as any, sessions as any, config);
    });

    it("signIn creates session and tokens", async () => {
        sessions.create.mockResolvedValue({ id: "sid1" });
        tokens.signAccess.mockReturnValue("access");
        tokens.signRefresh.mockReturnValue("refresh");

        const res = await service.signIn(
            { id: "u1", username: "john", tokenVersion: 0 },
            { ua: "ua", ip: "127.0.0.1" }
        );

        expect(sessions.create).toHaveBeenCalled();
        expect(tokens.signAccess).toHaveBeenCalled();
        expect(tokens.signRefresh).toHaveBeenCalled();
        expect(res).toEqual({
            access: "access",
            refresh: "refresh",
            accessTtlMs: 60000,
            refreshTtlMs: 120000
        });
    });

    it("signOut revokes session", async () => {
        await service.signOut("sid1");
        expect(sessions.revoke).toHaveBeenCalledWith("sid1");
    });

    it("refresh returns new access", async () => {
        tokens.signAccess.mockReturnValue("newAccess");
        const res = await service.refresh({
            userId: "u1",
            username: "john",
            sid: "sid1",
            tokenVersion: 1
        });
        expect(tokens.signAccess).toHaveBeenCalled();
        expect(res).toEqual({ access: "newAccess", accessTtlMs: 60000 });
    });

    it("setAuthCookies sets cookies", () => {
        const response = {
            cookie: vi.fn()
        } as unknown as Response;

        service.setAuthCookies(response, {
            access: "a",
            refresh: "r",
            accessTtlMs: 1000,
            refreshTtlMs: 2000
        });

        const calls = (response.cookie as any).mock.calls;
        expect(calls[0][0]).toBe(ACCESS_COOKIE);
        expect(calls[1][0]).toBe(REFRESH_COOKIE);
    });

    it("clearAuthCookies clears cookies", () => {
        const response = {
            clearCookie: vi.fn()
        } as unknown as Response;

        service.clearAuthCookies(response);
        expect((response.clearCookie as any).mock.calls[0][0]).toBe(
            ACCESS_COOKIE
        );
        expect((response.clearCookie as any).mock.calls[1][0]).toBe(
            REFRESH_COOKIE
        );
    });
});
