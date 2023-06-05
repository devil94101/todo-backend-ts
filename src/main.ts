import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import cookieParser from 'cookie-parser';
// import cors from 'cors'

async function bootstrap() {
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);
 
  // app.setGlobalPrefix('api');
  // app.use(cors())
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  //   next();
  // });
  
  // app.use(cookieParser(process.env.COOKIE_SECRET));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe()); 

  

  try {
    await app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}
bootstrap();