import * as path from 'path';
import * as sharp from 'sharp';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class SharpPipe
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  constructor(private readonly configService: ConfigService) {}

  checkStorage() {
    const storageFolder = path.join(process.cwd(), 'storage');
    if (!fs.existsSync(storageFolder)) {
      fs.mkdirSync(storageFolder, { recursive: true });
    }
  }

  async transform(image: Express.Multer.File): Promise<any> {
    this.checkStorage();
    const ext = path.parse(image.originalname).ext;
    const filename = Date.now() + ext;
    const location = path.join(process.cwd(), 'storage', filename);
    await sharp(image.buffer).resize(320, 240).toFile(location);

    return {
      filename,
      location: `${this.configService.get('APP_HOST')}/${filename}`,
    };
  }
}
