import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import chalk = require('chalk');

// ```
// import chalk = require('chalk');

// log(chalk.red.bgBlack`2 + 3 = {bold ${2 + 3}}`)
// ```

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  console.log(`app running at`, chalk.red.bgBlack`${process.env.PORT}`);
}
bootstrap();
