import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('App')
@Controller()
export class AppController {
  @Version(VERSION_NEUTRAL)
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
