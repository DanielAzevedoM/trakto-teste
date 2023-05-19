import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SaveImageController } from 'src/controllers/save.image.controller';
import { Image, ImageSchema } from 'src/models/save.image.model';
import { SaveImageRepository } from 'src/repositories/save.image.repository';
import { SaveImageService } from 'src/services/save.image.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
    ],
    controllers:[SaveImageController],
    providers:[SaveImageService, SaveImageRepository]
})
export class SaveImageModule { }
