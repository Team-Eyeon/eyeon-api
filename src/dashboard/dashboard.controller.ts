import { Controller, Get } from '@nestjs/common'
import { DashboardService } from './dashboard.service'
import { ApiTags, ApiResponse } from '@nestjs/swagger'

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get dashboard data.',
    schema: { example: { message: 'Dashboard' } },
  })
  getDashboard() {
    return this.dashboardService.getDashboard()
  }
}
