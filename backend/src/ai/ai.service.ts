import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

export interface PortfolioInput {
    initial_investment: number;
    monthly_sip: number;
    years: number;
    expected_return_rate: number;
    volatility?: number;
    step_up_percentage?: number;
}

@Injectable()
export class AiService {
    private aiServiceUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.aiServiceUrl = this.configService.get<string>('AI_SERVICE_URL', 'http://localhost:8000');
    }

    async getMonteCarloProjections(data: PortfolioInput) {
        try {
            const response = await firstValueFrom(
                this.httpService.post(`${this.aiServiceUrl}/predict/monte-carlo`, data)
            );
            return response.data;
        } catch (error) {
            throw new HttpException(
                'Failed to connect to AI Engine',
                HttpStatus.SERVICE_UNAVAILABLE,
            );
        }
    }

    async getRecommendedAllocation(riskScore: number) {
        try {
            const response = await firstValueFrom(
                this.httpService.post(`${this.aiServiceUrl}/recommend/allocation`, null, {
                    params: { risk_score: riskScore },
                })
            );
            return response.data;
        } catch (error) {
            throw new HttpException(
                'Failed to connect to AI Engine',
                HttpStatus.SERVICE_UNAVAILABLE,
            );
        }
    }

    async getRecommendedFunds(riskScore: number) {
        try {
            const response = await firstValueFrom(
                this.httpService.post(`${this.aiServiceUrl}/recommend/funds`, null, {
                    params: { risk_score: riskScore },
                })
            );
            return response.data;
        } catch (error) {
            throw new HttpException(
                'Failed to connect to AI Engine',
                HttpStatus.SERVICE_UNAVAILABLE,
            );
        }
    }
}
