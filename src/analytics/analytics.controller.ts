import { Controller, Get } from '@nestjs/common'
import { AnalyticsService } from './analytics.service'
import {
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger'
import { GetAnalyticsResponseDto } from './dto/get-analytics-response.dto'

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  @ApiOperation({ summary: 'Get analytics data' })
  @ApiResponse({
    status: 200,
    description: 'Get analytics data.',
    type: GetAnalyticsResponseDto,
  })
  getAnalytics() {
    return this.analyticsService.getAnalytics()
  }
}
