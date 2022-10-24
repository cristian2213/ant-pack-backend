import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
import { corsOptionsDelegate } from './config/cors/whilelist.config';
const logger = new Logger('Bootstrapping');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /**
   * Serves files&docs
   */
  app.useStaticAssets(join(process.cwd(), 'storage'));

  /**
   * Swagger Configuration
   */
  if (
    process.env.NODE_ENV === 'dev' ||
    process.env.NODE_ENV === 'development'
  ) {
    const config = new DocumentBuilder()
      .setTitle('Ant-pack "Test"')
      .setDescription('Pending...')
      .setVersion('0.0.1')
      .addBearerAuth({ in: 'header', type: 'http' })
      .addServer('v1')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc', app, document, {
      swaggerOptions: {
        filter: true,
        showRequestDuration: true,
      },
    });
  }

  /**
   * Global Pipes
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // This deletes properties we're not expecting in the request-body
      forbidNonWhitelisted: true,
      transformOptions: {
        // enableImplicitConversion: true, // Property transform properties like 1234 = '1234'
      },
      stopAtFirstError: true, // It stops at first error on the DTO
    }),
  );

  /**
   * API Version
   */
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });

  /**
   * CORS Configuration
   */
  app.enableCors(corsOptionsDelegate);

  /**
   * Port Configuration
   */
  await app.listen(process.env.PORT || 8081);

  /**
   * Microservice Logger
   */
  logger.log(
    `Ant-pack test is running on port ${
      process.env.PORT || 8081
    }.\nEnviroment: ${process.env.NODE_ENV}`,
  );
}

bootstrap();
