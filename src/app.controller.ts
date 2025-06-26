import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get welcome message' })
  @ApiResponse({
    status: 200,
    description: 'Returns a welcome message',
    schema: { example: 'Hello World!' },
  })
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({
    status: 200,
    description: 'Returns service health status',
    schema: {
      example: { status: 'ok', timestamp: '2024-01-01T00:00:00.000Z' },
    },
  })
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    }
  }
}
