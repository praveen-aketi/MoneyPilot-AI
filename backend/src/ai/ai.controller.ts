import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AiService } from './ai.service';

// Define DTO inline or import as class if needed for validation
export class PortfolioInputDto {
    initial_investment: number;
    monthly_sip: number;
    years: number;
    expected_return_rate: number;
    volatility?: number;
}

@Controller('ai')
export class AiController {
    constructor(private readonly aiService: AiService) { }

    @Post('projections')
    async getProjections(@Body() data: PortfolioInputDto) {
        return this.aiService.getMonteCarloProjections(data);
    }

    @Get('allocation')
    async getAllocation(@Query('risk_score') riskScore: string) {
        return this.aiService.getRecommendedAllocation(Number(riskScore));
    }

    @Get('funds')
    async getFunds(@Query('risk_score') riskScore: string) {
        return this.aiService.getRecommendedFunds(Number(riskScore));
    }
}
