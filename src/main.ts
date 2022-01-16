import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import chalk = require('chalk');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  console.log(`app running on port`, chalk.red.bgBlack`${process.env.PORT}`);
}
bootstrap();
