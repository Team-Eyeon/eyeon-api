import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { DashboardModule } from './dashboard/dashboard.module'
import { CamerasModule } from './cameras/cameras.module'
import { AlertsModule } from './alerts/alerts.module'
import { AnalyticsModule } from './analytics/analytics.module'
import { HistoryEventsModule } from './history-events/history-events.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST') || 'localhost',
        port: configService.get<number>('DB_PORT') || 5432,
        username: configService.get<string>('DB_USERNAME') || 'postgres',
        password: configService.getOrThrow<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME') || 'eyeon_api',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('DB_SYNC') || false,
      }),
    }),
    AuthModule,
    UsersModule,
    DashboardModule,
    CamerasModule,
    AlertsModule,
    AnalyticsModule,
    HistoryEventsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
