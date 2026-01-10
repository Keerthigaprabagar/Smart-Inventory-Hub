namespace Inventory.Api.Dtos;

public record WarehouseDto(int Id, string Name, string? Location);
public record CreateWarehouseDto(string Name, string? Location);
public record UpdateWarehouseDto(string Name, string? Location);
