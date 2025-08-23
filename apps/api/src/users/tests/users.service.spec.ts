vi.mock("bcrypt", () => ({
    default: { hash: vi.fn().mockResolvedValue("hashed") },
    hash: vi.fn().mockResolvedValue("hashed")
}));

import { ConflictException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { UsersService } from "src/users/users.service";

class PrismaServiceMock {
    user = {
        findFirst: vi.fn(),
        create: vi.fn(),
        findUnique: vi.fn()
    };
}

describe("UsersService", () => {
    let service: UsersService;
    let prisma: PrismaServiceMock;
    let config: ConfigService;

    beforeEach(() => {
        prisma = new PrismaServiceMock();
        config = {
            get: vi.fn((key: string) => {
                if (key === "BCRYPT_SALT_ROUNDS") return "10";
                return undefined;
            })
        } as unknown as ConfigService;

        service = new UsersService(prisma as any, config);

        // bcrypt.hash mocked with vi.mock above
    });

    it("creates user when email and username are unique", async () => {
        prisma.user.findFirst.mockResolvedValue(null);
        prisma.user.create.mockResolvedValue({
            id: "u1",
            username: "john",
            email: "john@mail.com",
            passwordHash: "hashed",
            tokenVersion: 0
        });

        const result = await service.create({
            username: "john",
            email: "john@mail.com",
            password: "pass"
        });
        expect(prisma.user.findFirst).toHaveBeenCalled();
        expect(bcrypt.hash).toHaveBeenCalled();
        expect(prisma.user.create).toHaveBeenCalled();
        expect(result).toEqual({
            id: "u1",
            username: "john",
            email: "john@mail.com",
            tokenVersion: 0
        });
    });

    it("throws ConflictException if user already exists", async () => {
        prisma.user.findFirst.mockResolvedValue({ id: "exists" });
        await expect(
            service.create({
                username: "john",
                email: "john@mail.com",
                password: "pass"
            })
        ).rejects.toBeInstanceOf(ConflictException);
    });

    it("finds user by email or username", async () => {
        prisma.user.findFirst.mockResolvedValue({ id: "u1" });
        const user = await service.findByEmailOrUsername("john");
        expect(user).toEqual({ id: "u1" } as any);
    });

    it("returns tokenVersion of user", async () => {
        prisma.user.findUnique.mockResolvedValue({ tokenVersion: 3 });
        const tv = await service.getTokenVersion("u1");
        expect(tv).toBe(3);
    });

    it("returns null if user not found when getting tokenVersion", async () => {
        prisma.user.findUnique.mockResolvedValue(null);
        const tv = await service.getTokenVersion("missing");
        expect(tv).toBeNull();
    });
});
