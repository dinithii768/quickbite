# 🍔 QuickBite — Food Delivery Platform

A professional, industry-level **Food Delivery System** built with
**Microservices Architecture** using Spring Boot, React, Docker, and Keycloak.

---

## 👥 Team

| Member | Role | Service |
|--------|------|---------|
| Sharadha Pathirana | Member 1 | Restaurant & Menu Service |
| Shani Randika | Member 2 | Order Service |

---

## 🏗️ Architecture
React Frontend (5173)
↓
API Gateway (8080)
↓
┌───────────────────────────────┐
│ │
Restaurant Service (8081) Order Service (8082)
│ │
Restaurant PostgreSQL (5432) Order PostgreSQL (5433)

Supporting Services:

Keycloak (8180) — OAuth 2.0 Authentication
Redis (6379) — Rate Limiting
text


---

## 🚀 Microservices

### 1. Restaurant & Menu Service
**Owner:** Member 1 — Sharadha Pathirana

Handles:
- Restaurant management (CRUD)
- Menu category management (CRUD)
- Menu item management (CRUD)

**Port:** `8081`
**Database:** `quickbite_restaurant_db`
**Swagger:** http://localhost:8081/swagger-ui.html

---

### 2. Order Service
**Owner:** Member 2

Handles:
- Cart management
- Order management (CRUD)
- Checkout process
- Order status tracking

**Port:** `8082`
**Database:** `quickbite_order_db`
**Swagger:** http://localhost:8082/swagger-ui.html

---

## 🔐 Security

| Layer | Method | Description |
|-------|--------|-------------|
| Gateway | OAuth 2.0 + JWT | User authentication via Keycloak |
| Gateway | CORS | Allow frontend origin only |
| Gateway | Rate Limiting | Redis-based request throttling |
| Each Service | API Key | `X-API-KEY` header validation |

---

## 🛠️ Technology Stack

| Category | Technology |
|----------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS |
| API Gateway | Spring Cloud Gateway |
| Backend | Spring Boot 3.x + Java 21 |
| Auth | Keycloak 24.x |
| Database | PostgreSQL 16 |
| Cache | Redis 7.x |
| Build | Maven 3.9.x |
| Container | Docker + Docker Compose |
| API Docs | Swagger UI + OpenAPI 3.0 |

---

## ⚡ Quick Start

### Prerequisites
- Docker Desktop installed and running
- Git

### Run the project

```bash
# Clone repository
git clone git@github.com:YOUR-USERNAME/quickbite.git
cd quickbite

# Copy environment file
cp .env.example .env
# Edit .env with your values

# Start all services
docker compose up --build
Access points
Service	URL
Frontend	http://localhost:5173
API Gateway	http://localhost:8080
Restaurant Swagger	http://localhost:8081/swagger-ui.html
Order Swagger	http://localhost:8082/swagger-ui.html
Keycloak Admin	http://localhost:8180/admin
📁 Project Structure
text

quickbite/
├── api-gateway/          ← Spring Cloud Gateway
├── restaurant-service/   ← Member 1: Restaurant & Menu
├── order-service/        ← Member 2: Cart & Orders
├── frontend/             ← React + Vite
├── infrastructure/
│   ├── keycloak/         ← Keycloak config
│   ├── postgres/         ← DB init scripts
│   └── redis/            ← Redis config
├── docs/                 ← Architecture diagrams
├── docker-compose.yml
├── .env.example
└── README.md
🌿 Git Branches
text

main          → Final production-ready code
develop       → Integration branch
feature/member1-restaurant-service   → Member 1 work
feature/member2-order-service        → Member 2 work
feature/shared-api-gateway           → Shared gateway work
feature/shared-frontend              → Shared frontend work
📋 API Endpoints
Restaurant Service (port 8081)
Method	Endpoint	Description
GET	/api/restaurants	Get all restaurants
GET	/api/restaurants/{id}	Get restaurant by ID
POST	/api/restaurants	Create restaurant
PUT	/api/restaurants/{id}	Update restaurant
DELETE	/api/restaurants/{id}	Delete restaurant
GET	/api/restaurants/{id}/menu	Get restaurant menu
GET	/api/menu-items	Get all menu items
POST	/api/menu-items	Create menu item
PUT	/api/menu-items/{id}	Update menu item
DELETE	/api/menu-items/{id}	Delete menu item
Order Service (port 8082)
Method	Endpoint	Description
GET	/api/orders	Get all orders
POST	/api/orders	Create order
GET	/api/orders/{id}	Get order by ID
PUT	/api/orders/{id}/status	Update order status
POST	/api/orders/{id}/checkout	Checkout
GET	/api/cart/{customerId}	Get cart
POST	/api/cart/{customerId}/items	Add to cart
DELETE	/api/cart/{customerId}/items/{itemId}	Remove from cart

🧪 Test Credentials
Role	Username	Password
Admin	admin1	admin123
Customer	customer1	customer123


QuickBite — Service-Oriented Computing Coursework
