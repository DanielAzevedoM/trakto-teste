export class ProcessedImageDto {
    localpath: {
        original: string
        thumb: string
    }
    metadata:{
        compress: number
        width: number
        height: number
        type: string
        mime: string
    }
    

}