namespace Inventory.Api.Dtos;

public record ProductDto(int Id, string Sku, string Name, decimal UnitPrice, bool IsActive);
public record CreateProductDto(string Sku, string Name, decimal UnitPrice);
public record UpdateProductDto(string Sku, string Name, decimal UnitPrice, bool IsActive);
