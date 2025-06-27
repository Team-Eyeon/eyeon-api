import { IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCameraDto {
  @ApiProperty({
    description: 'Name of the camera',
    example: 'Front Gate Camera',
  })
  @IsOptional()
  @IsString()
  name: string

  @ApiProperty({
    description: 'Location of the camera',
    example: 'Main Entrance',
  })
  @IsOptional()
  @IsString()
  location: string
}
