import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import '@sentry/tracing';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SentryModule } from './modules/sentry/sentry.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MedicalRecordsModule } from './modules/medical-records/medical-records.module';
import { AppointmentModule } from './modules/appointment/appointment.module';

@Module({
  imports: [
    SentryModule.forRoot({
      dsn: process.env.SENTRY_DNS,
      tracesSampleRate: 1.0,
      debug: true,
      environment: process.env.NODE_ENV,
    }),
    AuthModule,
    UsersModule,
    MedicalRecordsModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(Sentry.Handlers.requestHandler()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
