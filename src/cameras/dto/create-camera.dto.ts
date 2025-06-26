import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCameraDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  location: string
}
