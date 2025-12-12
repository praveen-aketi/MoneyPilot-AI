# MoneyPilot-AI Implementation Plan

## 1. Phases

### 🔹 Phase 1 – Core Financial Planner (MVP)
- **Features**: User Auth, Financial Profile, Portfolio Management, Static Projections.

### 🔹 Phase 2 – Market & Recommendation Engine
- **Features**: Live Market Data, Asset Comparison.

### 🔹 Phase 3 – Intelligence & Mobile
- **Features**: ML-based Risk Scoring, Monte Carlo Simulations, Mobile App.

## 2. Architecture (Modular Monolith + AI Sidecar)
- **Frontend**: Next.js 14+ (Port 3000).
- **Backend**: NestJS (Port 4000).
- **AI Engine**: Python FastAPI (Port 8000).
- **Database**: PostgreSQL + Redis.

## 3. Implementation Status
- [x] **Frontend**: MVP Running.
- [x] **Backend**: Initialized & Configured.
- [x] **AI Engine**:
    - [x] Initialized `ml-service` (Python/FastAPI).
    - [x] Implemented Monte Carlo Simulation endpoint.
    - [x] Implemented Allocation Recommendation endpoint.

## 4. Next Steps
1.  **Run AI Service**:
    - Install dependencies: `pip install -r ml-service/requirements.txt`
    - Start server: `uvicorn ml-service.app.main:app --reload --port 8000`
2.  **Backend Integration**:
    - [x] Create `AiService` in NestJS to call the Python API.
3.  **Frontend Integration**:
    - [x] Create a "Projections" page that calls the Backend -> AI Engine.
    - [x] Enable CORS in Backend for Frontend communication.
    - [x] Configure Docker Compose for full stack orchestration.
