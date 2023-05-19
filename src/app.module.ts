import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SaveImageModule } from './modules/save.image.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://localhost/trakto_teste',
      }),
    }),
    SaveImageModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
