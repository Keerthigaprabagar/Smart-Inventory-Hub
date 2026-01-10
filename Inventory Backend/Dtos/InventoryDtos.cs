namespace Inventory.Api.Dtos;

public record InventoryDto(int Id, int ProductId, string ProductSku, string ProductName, int WarehouseId, string WarehouseName, int Quantity);

public record MovementDto(
    int ProductId,
    int Quantity,
    string Type,           // "in" | "out" | "transfer"
    int? FromWarehouseId,
    int? ToWarehouseId,
    string? Note
);
