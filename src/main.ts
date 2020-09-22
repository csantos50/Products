import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from "@nestjs/microservices"

const logger = new Logger('Main')


async function bootstrap() {
  const port = process.env.PORT ? Number(process.env.PORT) : 8877;

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.HOST,
      port: port,
    },
  });
  await app.listen(() => console.log('Microservice listening on port:', port));
}
bootstrap();
