import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    const dbHost = this.configService.get<string>('DB_HOST');
    const dbPort = this.configService.get<number>('DB_PORT');
    const dbDatabase = this.configService.get<string>('DB_DATABASE');
    return `Hello World! Database is running at ${dbHost}:${dbPort}:${dbDatabase}`;
  }
}
