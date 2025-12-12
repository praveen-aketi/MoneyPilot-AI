import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FinancialProfilesModule } from './financial-profiles/financial-profiles.module';
import { GoalsModule } from './goals/goals.module';
import { AssetsModule } from './assets/assets.module';
import { HoldingsModule } from './holdings/holdings.module';
import { SipPlansModule } from './sip-plans/sip-plans.module';
import { InsurancePoliciesModule } from './insurance-policies/insurance-policies.module';
import { EmergencyFundsModule } from './emergency-funds/emergency-funds.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: 'moneypilot.db',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Set to false in production
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    FinancialProfilesModule,
    GoalsModule,
    AssetsModule,
    HoldingsModule,
    SipPlansModule,
    InsurancePoliciesModule,
    EmergencyFundsModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
