import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import cookieParser from 'cookie-parser';

async function bootstrap() {
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);
 
  // app.setGlobalPrefix('api');
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.enableCors({ origin: ['http://localhost:3000',"https://todo-ts-blue.vercel.app"], credentials: true });
  app.useGlobalPipes(new ValidationPipe());

  try {
    await app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}
bootstrap();