import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);
 
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe()); 

  try {
    await app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}
bootstrap();