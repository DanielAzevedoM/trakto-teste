import { Controller, Post, Body } from '@nestjs/common';
import { ImageDto } from 'src/dtos/image.dto';
import { ProcessedImageDto } from 'src/dtos/processed.image.dto';
import { SaveImageService } from 'src/services/save.image.service';

@Controller()
export class SaveImageController {
    constructor(private readonly saveImageService: SaveImageService) { }

    @Post('image/save')
    saveImage(@Body() data: ImageDto): Promise<ProcessedImageDto> {
        return this.saveImageService.saveImage(data)
    }
    
}


