📦 Inventory Management System (IMS)
A full-stack, enterprise-grade inventory tracking solution built with ASP.NET Core 8.0 Web API and Angular 20. This system enables businesses to track stock levels, manage multi-warehouse logistics, and oversee supplier relationships with role-based security. 

Features
Core Functionality (Functional Requirements)
Inventory Tracking: Real-time monitoring of stock levels across multiple warehouse locations.
Supplier Management: Maintain a directory of suppliers and track procurement history.
Transaction Logging: Full audit trail for every stock movement (Inbound, Outbound, Internal Transfer).
Reporting Dashboard: Visual analytics for low-stock alerts, fast-moving items, and valuation.
User Management: Identity-based security with roles (Admin, Manager, Staff). 

Technical Capabilities (Non-Functional Requirements) 
Security: JWT-based authentication and Role-Based Access Control (RBAC).
Scalability: Stateless API design to handle high-volume data transactions.
Performance: Optimized SQL queries and Angular-side caching for sub-second page loads.
Responsiveness: Mobile-first UI using Angular Material/Bootstrap. 

Tech Stack
Layer 	Technology
Backend	.NET 8.0 Web API
Frontend	Angular 20
Database	SQL Server (Entity Framework Core)
Auth	ASP.NET Core Identity + JWT
Documentation	Swagger (OpenAPI)

📋 Software Requirements Specification (SRS)
1. Purpose
The IMS aims to digitize warehouse operations, reducing manual errors in stock counting and optimizing the procurement cycle. 
2. User Roles
Admin: Complete system control, user management, and financial reporting.
Manager: Inventory oversight, warehouse transfers, and supplier negotiation.
Staff: Stock entry, barcode scanning, and order fulfillment. 
3. System Architecture
The project follows a Clean Architecture pattern: 
API Layer: Controllers and Middleware.
Application Layer: Business Logic and DTOs.
Domain Layer: Entities and Value Objects.
Infrastructure: Database context and external services.
 
⚙️ Getting Started
Prerequisites
.NET 8.0 SDK
Node.js (Latest LTS)
Angular CLI
SQL Server (LocalDB or Express) 

Installation
Clone the Repository
bash
git clone github.com
cd inventory-management-system
Use code with caution.

Backend Setup
bash
cd Backend/InventoryAPI
dotnet restore
update-database # Ensure connection string in appsettings.json is correct
dotnet run
Use code with caution.

Frontend Setup
bash
cd Frontend/InventoryUI
npm install
ng serve
Use code with caution.

Navigate to http://localhost:4200 
🔒 Security & Access
The API is protected by JWT Bearer Authentication. Ensure you include the Authorization: Bearer <Token> header in your requests after logging in via the /api/auth/login endpoint.

📄 License
This project is licensed under the MIT License 'https://github.com/Keerthigaprabagar/Smart-Inventory-Hub/blob/3a27973de411a278a0037c42ddba94026dc8f7b1/LICENSE'

🤝 Contributing
Fork the project.
Create your Feature Branch (git checkout -b feature/AmazingFeature).
Commit your changes (git commit -m 'Add some AmazingFeature').
Push to the Branch (git push origin feature/AmazingFeature).
Open a Pull Request. 

