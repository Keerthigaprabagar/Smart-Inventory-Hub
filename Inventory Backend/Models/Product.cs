using System.ComponentModel.DataAnnotations;

namespace Inventory.Api.Models;

public class Product
{
    public int Id { get; set; }

    [Required, MaxLength(64)]
    public string Sku { get; set; } = string.Empty;

    [Required, MaxLength(256)]
    public string Name { get; set; } = string.Empty;

    public decimal UnitPrice { get; set; }

    public bool IsActive { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<InventoryItem> InventoryItems { get; set; } = new List<InventoryItem>();
}
