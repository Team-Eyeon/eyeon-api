import { Controller, Get } from '@nestjs/common'
import { DashboardService } from './dashboard.service'
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger'
import { GetDashboardResponseDto } from './dto/get-dashboard-response.dto'

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @ApiOperation({ summary: 'Get dashboard data' })
  @ApiResponse({
    status: 200,
    description: 'Get dashboard data.',
    type: GetDashboardResponseDto,
  })
  getDashboard() {
    return this.dashboardService.getDashboard()
  }
}
