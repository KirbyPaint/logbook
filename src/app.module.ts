import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Prime1LogModule } from './prime1-log/prime1-log.module';
import { Prime2LogModule } from './prime2-log/prime2-log.module';
import { Prime3LogModule } from './prime3-log/prime3-log.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    UsersModule,
    Prime1LogModule,
    Prime2LogModule,
    Prime3LogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
