import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { env } from './config/env';

async function bootstrap() {
  console.log(`\n⏳ Starting server...\n`);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(env.PORT, '0.0.0.0');
  console.log(`\n👀 Server is running on: ${env.PORT} [${env.APP_STAGE}]\n`);
}
bootstrap();
