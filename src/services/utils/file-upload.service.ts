import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { extname } from 'path';

@Injectable()
export class FileUpload {
  public static fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    callback,
  ) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/))
      return callback(null, false);
    callback(null, true);
  };

  public generateRandomName = (fileName: string) => {
    const fileExtName = extname(fileName);
    const randomName = Array(10)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    return `${randomName}${fileExtName}`;
  };
}
