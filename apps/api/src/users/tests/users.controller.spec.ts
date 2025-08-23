import { describe, expect, it, vi } from "vitest";

import { UsersController } from "src/users/users.controller";

describe("UsersController", () => {
    it("proxies user creation to service", async () => {
        const service = {
            create: vi.fn().mockResolvedValue({ id: "u1", username: "john" })
        } as any;
        const controller = new UsersController(service);

        const dto = {
            username: "john",
            email: "john@mail.com",
            password: "pass"
        } as any;
        const res = await controller.create(dto);

        expect(service.create).toHaveBeenCalledWith(dto);
        expect(res).toEqual({ id: "u1", username: "john" });
    });
});
