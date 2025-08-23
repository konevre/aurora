import { vi } from "vitest";

vi.mock("bcrypt", () => ({
    default: { compare: vi.fn().mockResolvedValue(true) },
    compare: vi.fn().mockResolvedValue(true)
}));

import { beforeEach, describe, expect, it } from "vitest";

import { AuthController } from "src/auth/auth.controller";

describe("AuthController", () => {
    let authService: any;
    let usersService: any;
    let controller: AuthController;

    beforeEach(() => {
        authService = {
            signIn: vi.fn(),
            setAuthCookies: vi.fn(),
            signOut: vi.fn(),
            clearAuthCookies: vi.fn(),
            refresh: vi.fn()
        };
        usersService = {
            create: vi.fn(),
            findByEmailOrUsername: vi.fn()
        };
        controller = new AuthController(authService, usersService);
    });

    it("signup creates user and sets cookies", async () => {
        usersService.create.mockResolvedValue({
            id: "u1",
            username: "john",
            tokenVersion: 0
        });
        authService.signIn.mockResolvedValue({ access: "a", refresh: "r" });
        const req = { headers: { "user-agent": "ua" }, ip: "127.0.0.1" } as any;
        const res = {} as any;

        const result = await controller.signUp({} as any, req, res);
        expect(authService.setAuthCookies).toHaveBeenCalled();
        expect(result).toEqual({ id: "u1", username: "john" });
    });

    it("signin logs in and sets cookies when valid data", async () => {
        usersService.findByEmailOrUsername.mockResolvedValue({
            id: "u1",
            username: "john",
            passwordHash: "hash",
            tokenVersion: 0
        });
        authService.signIn.mockResolvedValue({ access: "a", refresh: "r" });
        const req = { headers: { "user-agent": "ua" }, ip: "127.0.0.1" } as any;
        const res = {} as any;

        const result = await controller.signIn(
            { emailOrUsername: "john", password: "p" } as any,
            req,
            res
        );
        expect(authService.setAuthCookies).toHaveBeenCalled();
        expect(result).toEqual({ id: "u1", username: "john" });
    });

    it("signout clears cookies and revokes session", async () => {
        const req = { user: { userId: "u1", sid: "s1" } } as any;
        const res = {} as any;
        const resBody = await controller.signOut(req, res);
        expect(authService.signOut).toHaveBeenCalledWith("s1");
        expect(authService.clearAuthCookies).toHaveBeenCalled();
        expect(resBody).toEqual({ ok: true });
    });

    it("refresh updates access and sets cookie", async () => {
        const req = { user: { userId: "u1", sid: "s1" } } as any;
        const res = {} as any;
        authService.refresh.mockResolvedValue({
            access: "a",
            accessTtlMs: 1000
        });
        const body = await controller.refresh(req, res);
        expect(authService.setAuthCookies).toHaveBeenCalled();
        expect(body).toEqual({ ok: true, accessTtlMs: 1000 });
    });
});
