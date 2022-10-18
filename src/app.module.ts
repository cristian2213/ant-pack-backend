import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { config, envs, validations } from 'src/config';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/modules/users.module';
import { UtilsModule } from 'src/modules/utils.module';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          ttl: config.get('SECURITY_REQUEST_TTL'),
          limit: config.get('SECURITY_REQUEST_LIMIT'),
        };
      },
    }),
    ConfigModule.forRoot({
      envFilePath: envs[process.env.NODE_ENV] || envs['dev'],
      isGlobal: true,
      load: [config],
      validationSchema: validations,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'storage'),
    }),
    DatabaseModule,
    UsersModule,
    UtilsModule,
  ],
})
export class AppModule {}
