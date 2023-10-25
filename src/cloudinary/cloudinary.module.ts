import { Global, Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import {  CloudinaryProvider } from './cloudinary/cloudinary';

@Global() 
@Module({
  providers: [CloudinaryService, CloudinaryProvider],
  exports: [CloudinaryProvider, CloudinaryService]
})
export class CloudinaryModule {


  
}
