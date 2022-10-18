export interface ConnectionConfig {
  type: any;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  synchronize: boolean;
  autoLoadEntities: boolean;
  ssl?: { rejectUnauthorized: boolean };
}
