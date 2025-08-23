import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";

import { AppController } from "../app.controller";
import { AppService } from "../app.service";

describe.skip("AppController (legacy)", () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService]
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    it("skipped legacy test", () => {
        expect(true).toBe(true);
    });
});
