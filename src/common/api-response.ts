import { ApiProperty } from '@nestjs/swagger'

export class ApiResponse<T> {
  constructor(dataType: new () => T, data: T, message?: string) {
    this.success = true
    this.data = data
    this.message = message
    this.timestamp = new Date()
  }

  @ApiProperty({
    description: 'Whether the request was successful',
    type: Boolean,
  })
  success: boolean

  @ApiProperty({
    description: 'The data of the response',
    type: Object,
  })
  data: T

  message?: string

  @ApiProperty({
    description: 'The timestamp of the response',
    type: Date,
  })
  timestamp: Date
}
