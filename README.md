# MoneyPilot AI

MoneyPilot AI is an intelligent financial planning application that combines a modern Next.js 14 frontend, a robust NestJS backend, and a Python-based AI engine for advanced financial modeling (Monte Carlo simulations, Market Analysis).

## 🏗 Architecture

The project follows a **Modular Monolith + AI Sidecar** architecture:

*   **Frontend**: Next.js 14 (App Router)
*   **Backend**: NestJS (Node.js)
*   **AI Engine**: FastAPI (Python 3.10)
*   **Database**: PostgreSQL
*   **Infrastructure**: Docker, Kubernetes (AKS), Azure DevOps, Terraform

## 🚀 Getting Started

### Prerequisites
*   Docker & Docker Compose
*   Node.js v20+
*   Python 3.10+

### Local Development (Docker)
The easiest way to run the entire stack is using Docker Compose:

```bash
docker-compose up --build
```
This will start:
*   Frontend: [http://localhost:3000](http://localhost:3000)
*   Backend: [http://localhost:4000](http://localhost:4000)
*   AI Engine: [http://localhost:8000](http://localhost:8000)
*   PostgreSQL: Port 5432

### Manual Setup
If you prefer running services individually, see the `scripts` section in `package.json`.

## ☁️ Azure DevOps & Infrastructure

This project includes a comprehensive CI/CD pipeline and Infrastructure-as-Code (IaC) configuration.

### 1. Infrastructure (Terraform)
Located in the `terraform/` directory. This configuration provisions:
*   **Resource Group**
*   **Azure Container Registry (ACR)**
*   **Azure Kubernetes Service (AKS)**

**Provisioning Steps:**
1.  `cd terraform`
2.  `az login`
3.  `terraform init`
4.  `terraform apply`

### 2. CI/CD Pipeline (Azure Pipelines)
The `azure-pipelines.yml` file defines a multi-stage pipeline:
1.  **Build & Test**: Lints and tests Frontend, Backend, and AI services.
2.  **Build & Push**: Builds Docker images and pushes to ACR.
3.  **Deploy**: Deploys the application to AKS using manifests in `k8s/`.

**Setup:**
*   Create an Azure DevOps Project.
*   Create Service Connections for **Docker Registry** and **Kubernetes** using the outputs from Terraform.
*   Update the `variables` section in `azure-pipelines.yml` with your ACR details.

### 3. Kubernetes
The application runs on Kubernetes using manifests in the `k8s/` directory:
*   `postgres.yaml`: Database (StatefulSet)
*   `backend.yaml`: Backend Service
*   `ai-engine.yaml`: AI Service
*   `frontend.yaml`: Frontend Service (LoadBalancer)

*Note: For production, we recommend replacing `postgres.yaml` with a managed Azure Database for PostgreSQL.*
