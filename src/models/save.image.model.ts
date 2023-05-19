import { Prop, Schema, SchemaFactory,  } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema() 
export class Image {

    @Prop()
    originalName: string;

    @Prop()
    compress: number;

    @Prop()
    width: number;

    @Prop()
    height: number;

    @Prop()
    type: string;

    @Prop()
    mime: string

}


export const ImageSchema = SchemaFactory.createForClass(Image);