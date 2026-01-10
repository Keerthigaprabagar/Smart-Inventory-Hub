namespace Inventory.Api.Models;

public class InventoryItem
{
    public int Id { get; set; }

    public int ProductId { get; set; }
    public Product Product { get; set; } = default!;

    public int WarehouseId { get; set; }
    public Warehouse Warehouse { get; set; } = default!;

    public int Quantity { get; set; }
}
