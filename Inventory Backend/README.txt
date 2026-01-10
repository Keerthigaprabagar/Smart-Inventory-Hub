Inventory API (.NET 8) — Quick Start

1) Open this folder in Visual Studio 2022 (File > Open > Project/Solution > select Inventory.Api.csproj), or VS Code.
2) Ensure SQL Server Express is installed and running. The default connection string in appsettings.json is:
   Server=.\SQLEXPRESS;Database=InventoryDb;Trusted_Connection=True;TrustServerCertificate=True;
   Change if needed.
3) Install EF Core tools (once):
   dotnet tool install --global dotnet-ef
4) Restore packages:
   dotnet restore
5) Add migration + update database:
   dotnet ef migrations add InitialCreate -p Inventory.Api/Inventory.Api.csproj -s Inventory.Api/Inventory.Api.csproj
   dotnet ef database update -p Inventory.Api/Inventory.Api.csproj -s Inventory.Api/Inventory.Api.csproj
6) Run the API:
   dotnet run --project Inventory.Api/Inventory.Api.csproj
   Swagger UI will open at https://localhost:7160/swagger during development.
7) Allow CORS for Angular dev (http://localhost:4200) is already configured in Program.cs.

Endpoints (base /api):
- /products  (GET, POST)
- /products/{id} (GET, PUT, DELETE)
- /warehouses (GET, POST)
- /warehouses/{id} (GET, PUT, DELETE)
- /inventory (GET)
- /inventory/by-product/{productId} (GET)
- /inventory/low-stock?threshold=5&warehouseId=1 (GET)
- /movements (POST) with body: 
  {
    "productId": 1,
    "quantity": 10,
    "type": "in" | "out" | "transfer",
    "fromWarehouseId": 1,
    "toWarehouseId": 2,
    "note": "optional"
  }
