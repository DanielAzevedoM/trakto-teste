import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ImageDto } from 'src/dtos/image.dto';
import { ProcessedImageDto } from 'src/dtos/processed.image.dto';
import { SaveImageRepository } from 'src/repositories/save.image.repository';

@Injectable()
export class SaveImageService {
    constructor(private readonly saveImageRepository: SaveImageRepository){};

    async saveImage(data: ImageDto): Promise<ProcessedImageDto>{
        const processImage = await handleErrors(this.saveImageRepository.processImage(data), 'saveImageRepository.processImage');
        
        await handleErrors(this.saveImageRepository.saveMetaDataDb({...processImage}), 'saveMetaDataDB');

        return { ...processImage };
    }
}

async function handleErrors(promise: Promise<any>, errorLocation: string) {
    try {
      const result = await promise;
      return result;
    } catch (error) {
      const errorMessage = `Erro em '${errorLocation}'`;
      throw new HttpException({ errors:[{
        code: HttpStatus.NOT_FOUND,
        message:errorMessage
      }]}, HttpStatus.BAD_REQUEST);
    }
  }
  