import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator'
import { AlertType } from '../entities/alert.entity'

export class CreateAlertDto {
  @IsNumber()
  cameraId: number

  @IsOptional()
  @IsString()
  message: string

  @IsOptional()
  @IsArray()
  @IsEnum(AlertType, { each: true })
  types: AlertType[]

  @IsOptional()
  @IsString()
  screenshotUrl?: string

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  threatScore?: number
}
