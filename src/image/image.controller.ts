import { Controller, Post } from "@nestjs/common";







@Controller('file')


export class ImageController {
    @Post('upload')
    async uploadFile() {
    
    }
}