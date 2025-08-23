import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";

import { env } from "./config/env";
import { AppModule } from "./app.module";

async function bootstrap() {
    console.log(`\n⏳ Starting server...\n`);

    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());
    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, transform: true })
    );

    await app.listen(env.PORT, "0.0.0.0");

    console.log(`\n👀 Server is running on: ${env.PORT} [${env.APP_STAGE}]\n`);
}
bootstrap();
