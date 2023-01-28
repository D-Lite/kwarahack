import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { PrismaService } from './prisma/prisma.service';
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({transform: true, whitelist: true}));
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll'
  })
  )


  const config = new DocumentBuilder()
    .setTitle('TEAM PSYCHE')
    .setDescription('Kwara State Innovation Hackathon')
    .setVersion('1.0')
    .addTag('hackathon, health')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
