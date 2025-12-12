from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import pandas as pd
from typing import List

app = FastAPI(title="MoneyPilot AI Engine")

class PortfolioInput(BaseModel):
    initial_investment: float
    monthly_sip: float
    years: int
    expected_return_rate: float  # Annual return rate (e.g., 0.12 for 12%)
    volatility: float = 0.15     # Standard deviation (Risk)
    step_up_percentage: float = 0.0 # Annual SIP Step-up percentage

class ProjectionResponse(BaseModel):
    years: List[int]
    conservative: List[float]
    moderate: List[float]
    aggressive: List[float]

@app.get("/")
def read_root():
    return {
        "status": "AI Engine Online",
        "version": "1.0.0"
    }

@app.post("/predict/monte-carlo", response_model=ProjectionResponse)
def predict_portfolio_growth(data: PortfolioInput):
    """
    Run Monte Carlo Simulation to predict portfolio growth.
    """
    try:
        simulations = 1000
        months = data.years * 12
        monthly_return_mean = data.expected_return_rate / 12
        monthly_volatility = data.volatility / np.sqrt(12)

        # Simulation matrix: [months, simulations]
        results = np.zeros((months + 1, simulations))
        results[0] = data.initial_investment

        current_sip = np.full(simulations, data.monthly_sip)

        for t in range(1, months + 1):
            # Increase SIP every year (every 12 months)
            if t > 1 and (t - 1) % 12 == 0:
                current_sip = current_sip * (1 + data.step_up_percentage / 100)

            # Random monthly returns based on normal distribution
            rand_returns = np.random.normal(monthly_return_mean, monthly_volatility, simulations)
            # Apply returns + Add SIP
            results[t] = results[t-1] * (1 + rand_returns) + current_sip

        # Calculate percentiles (10th = Conservative, 50th = Moderate, 90th = Aggressive)
        percentiles = np.percentile(results, [10, 50, 90], axis=1)
        
        # Extract yearly data points for the graph
        yearly_indices = [i * 12 for i in range(data.years + 1)]
        
        return {
            "years": list(range(data.years + 1)),
            "conservative": [round(x, 2) for x in percentiles[0][yearly_indices]],
            "moderate": [round(x, 2) for x in percentiles[1][yearly_indices]],
            "aggressive": [round(x, 2) for x in percentiles[2][yearly_indices]]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/recommend/allocation")
def recommend_allocation(risk_score: int):
    """
    Simple rule-based allocation recommendation (Placeholder for ML clustering).
    Risk Score: 1 (Low) to 10 (High)
    """
    if risk_score <= 3:
        return {"equity": 30, "debt": 60, "gold": 10}
    elif risk_score <= 7:
        return {"equity": 60, "debt": 30, "gold": 10}
    else:
        return {"equity": 80, "debt": 15, "gold": 5}

class MutualFund(BaseModel):
    name: str
    category: str
    rating: float
    returns_3y: float
    returns_5y: float
    expense_ratio: float
    fund_manager: str
    manager_experience: str
    risk_level: str
    description: str

MOCK_FUNDS = [
    MutualFund(
        name="HDFC Mid-Cap Opportunities Fund",
        category="Equity: Mid Cap",
        rating=4.5,
        returns_3y=28.5,
        returns_5y=21.2,
        expense_ratio=0.95,
        fund_manager="Chirag Setalvad",
        manager_experience="15+ Years",
        risk_level="High",
        description="A high-growth fund focusing on mid-sized companies with strong potential."
    ),
    MutualFund(
        name="SBI Bluechip Fund",
        category="Equity: Large Cap",
        rating=4.0,
        returns_3y=15.8,
        returns_5y=14.5,
        expense_ratio=0.88,
        fund_manager="Sohini Andani",
        manager_experience="20+ Years",
        risk_level="Moderate-High",
        description="Invests in established large-cap companies. Good for stable long-term growth."
    ),
    MutualFund(
        name="ICICI Prudential Balanced Advantage Fund",
        category="Hybrid",
        rating=4.2,
        returns_3y=12.5,
        returns_5y=11.8,
        expense_ratio=1.10,
        fund_manager="Sankaran Naren",
        manager_experience="30+ Years",
        risk_level="Moderate",
        description="Dynamically manages equity and debt allocation based on market valuation."
    ),
    MutualFund(
        name="Axis Liquid Fund",
        category="Debt",
        rating=3.8,
        returns_3y=5.2,
        returns_5y=5.5,
        expense_ratio=0.15,
        fund_manager="Aditya Pagaria",
        manager_experience="12+ Years",
        risk_level="Low",
        description="Low-risk fund suitable for parking surplus cash for short durations."
    ),
    MutualFund(
        name="Nippon India Small Cap Fund",
        category="Equity: Small Cap",
        rating=5.0,
        returns_3y=35.4,
        returns_5y=28.1,
        expense_ratio=1.05,
        fund_manager="Samir Rachh",
        manager_experience="18+ Years",
        risk_level="Very High",
        description="Invests in small-cap companies. High risk but potential for massive returns."
    ),
    MutualFund(
        name="Kotak Corporate Bond Fund",
        category="Debt",
        rating=4.1,
        returns_3y=6.8,
        returns_5y=7.2,
        expense_ratio=0.35,
        fund_manager="Deepak Agrawal",
        manager_experience="16+ Years",
        risk_level="Low-Moderate",
        description="Invests in top-rated corporate bonds. Good for steady income."
    )
]

@app.post("/recommend/funds", response_model=List[MutualFund])
def recommend_funds(risk_score: int):
    """
    Recommend mutual funds based on Risk Score (1-10).
    """
    if risk_score <= 3:
        # Conservative: Mostly Debt and Hybrid
        return [f for f in MOCK_FUNDS if f.category in ["Debt", "Hybrid"]]
    elif risk_score <= 7:
        # Moderate: Large Cap, Hybrid, some Mid Cap
        return [f for f in MOCK_FUNDS if f.category in ["Hybrid", "Equity: Large Cap", "Equity: Mid Cap"]]
    else:
        # Aggressive: Mid Cap, Small Cap, Large Cap
        return [f for f in MOCK_FUNDS if "Equity" in f.category]
