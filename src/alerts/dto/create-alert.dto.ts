import { IsArray, IsInt, IsOptional, IsString, Max, Min } from 'class-validator'
import { AlertType } from '../entities/alert.entity'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateAlertDto {
  @ApiProperty({
    description: 'ID of the camera associated with the alert',
    example: 1,
  })
  cameraId: number | string

  @ApiPropertyOptional({
    description: 'Alert message',
    example: 'Suspicious activity detected',
  })
  @IsOptional()
  @IsString()
  message?: string

  @ApiPropertyOptional({
    description: 'Types of the alert',
    enum: AlertType,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  types?: string[]

  @ApiPropertyOptional({
    description: 'Screenshot URL',
    example: 'http://example.com/screenshot.jpg',
  })
  @IsOptional()
  @IsString()
  screenshotUrl?: string

  @ApiPropertyOptional({
    description: 'Threat score (0-100)',
    minimum: 0,
    maximum: 100,
    example: 75,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  threatScore?: number
}
