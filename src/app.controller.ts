import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, mediaFileFilter } from './utils/file-ul.utils';

@Controller()
export class AppController {
  @Post()
  @UseInterceptors(
      FilesInterceptor('media', 20, {
        storage: diskStorage({
          destination: './files',
          filename: editFileName,
        }),
        fileFilter: mediaFileFilter,
      }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
      const fileResponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileResponse);
    });
    return response;
  }

  @Get(':mediaPath')
  showUploadedFile(@Param('mediaPath') media, @Res() res) {
    return res.sendFile(media, { root: './files' });
  }
}
