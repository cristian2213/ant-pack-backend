import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config';
import { ConnectionConfig } from 'src/interfaces';
import { User } from 'src/entities/user.entity';
import { Address } from 'src/entities/addresses.entity';
import { Company } from 'src/entities/company.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (
        configService: ConfigType<typeof config>,
      ): ConnectionConfig => {
        const {
          DB_DIALECT,
          DB_HOST,
          DB_NAME,
          DB_PORT,
          DB_USER,
          DB_PASS,
          DB_SYNCHRONIZE,
          DB_AUTOLOAD_ENTITIES,
          DB_REJECTUNAUTHORIZED,
        } = configService.pgDb;

        const dbConfig = {
          type: DB_DIALECT,
          host: DB_HOST,
          port: Number(DB_PORT),
          database: DB_NAME,
          username: DB_USER,
          password: DB_PASS,
          synchronize: DB_SYNCHRONIZE ? true : false,
          autoLoadEntities: DB_AUTOLOAD_ENTITIES == 'true' ? true : false,
        };

        const isSslConnection = DB_REJECTUNAUTHORIZED == 'true' ? true : false;
        if (isSslConnection) {
          dbConfig['ssl'] = {
            rejectUnauthorized: false,
          };
        }

        return dbConfig;
      },
    }),
    TypeOrmModule.forFeature([User, Address, Company]),
  ],

  exports: [TypeOrmModule],
})
export class DatabaseModule {}
