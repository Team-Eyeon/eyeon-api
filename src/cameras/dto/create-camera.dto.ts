import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCameraDto {
  @ApiProperty({
    description: 'Name of the camera',
    example: 'Front Gate Camera',
  })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({
    description: 'Location of the camera',
    example: 'Main Entrance',
  })
  @IsNotEmpty()
  @IsString()
  location: string
}
