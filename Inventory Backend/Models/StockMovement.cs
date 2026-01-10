using System.ComponentModel.DataAnnotations;

namespace Inventory.Api.Models;

public enum MovementType
{
    In = 1,
    Out = 2,
    Transfer = 3
}

public class StockMovement
{
    public int Id { get; set; }

    [Required]
    public int ProductId { get; set; }

    public int? FromWarehouseId { get; set; }
    public int? ToWarehouseId { get; set; }

    [Range(1, int.MaxValue)]
    public int Quantity { get; set; }

    [Required]
    public MovementType Type { get; set; }

    [MaxLength(512)]
    public string? Note { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
