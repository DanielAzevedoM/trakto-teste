import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Image, ImageDocument } from 'src/models/save.image.model';
import * as mime from 'mime-types';
import * as fs from 'fs';
import axios from "axios";
import sizeOf from 'image-size';
import { ImageDto } from "src/dtos/image.dto";
import { ProcessedImageDto } from "src/dtos/processed.image.dto";

@Injectable()
export class SaveImageRepository {

    constructor(@InjectModel(Image.name) private imageRepository: Model<ImageDocument>) {}
 
    async processImage(data: ImageDto): Promise<ProcessedImageDto>{
        const response = await axios.get(data.image, { responseType: 'arraybuffer' });
        const fileName = data.image.split('/').pop(); 
        const filePath = `./src/uploads/original_img/${fileName}`;
        await fs.promises.writeFile(filePath, response.data);
        const dimensions = sizeOf(filePath);
        const mimeType = mime.lookup(filePath);

        const localpath = {
            original: filePath,
            thumb: ""
        }

        const metadata = {
            compress: data.compress,
            width: dimensions.width,
            height: dimensions.height,
            type: dimensions.type,
            mime: mimeType
        };

        if(metadata.width < 720){
            const ext = fileName.split('.').pop();
            const name = fileName.substring(0, fileName.lastIndexOf('.'));
            const thumbFileName = `${name}_thumb.${ext}`;
            const thumbPath = `src/uploads/compressed_img/${thumbFileName}`;
            await fs.promises.writeFile(thumbPath, response.data);
            localpath.thumb = thumbPath;
        }

        return { localpath, metadata }
    }

    async saveMetaDataDb(data: ProcessedImageDto): Promise<ImageDocument>{
        return new this.imageRepository({ originalName: data.localpath.original, ...data.metadata}).save()
    }
}
