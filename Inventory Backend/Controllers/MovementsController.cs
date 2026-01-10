using Inventory.Api.Data;
using Inventory.Api.Dtos;
using Inventory.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Inventory.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MovementsController : ControllerBase
{
    private readonly AppDbContext _db;

    public MovementsController(AppDbContext db) => _db = db;

    [HttpPost]
    public async Task<IActionResult> Create(MovementDto dto)
    {
        var type = dto.Type.Trim().ToLowerInvariant();
        if (dto.Quantity <= 0)
            return BadRequest("Quantity must be greater than 0.");

        var product = await _db.Products.FindAsync(dto.ProductId);
        if (product is null) return NotFound($"Product {dto.ProductId} not found.");

        switch (type)
        {
            case "in":
                if (dto.ToWarehouseId is null) return BadRequest("ToWarehouseId is required for 'in'.");
                await AddStock(dto.ProductId, dto.ToWarehouseId.Value, dto.Quantity);
                break;

            case "out":
                if (dto.FromWarehouseId is null) return BadRequest("FromWarehouseId is required for 'out'.");
                var ok = await RemoveStock(dto.ProductId, dto.FromWarehouseId.Value, dto.Quantity);
                if (!ok) return BadRequest("Insufficient stock.");
                break;

            case "transfer":
                if (dto.FromWarehouseId is null || dto.ToWarehouseId is null || dto.FromWarehouseId == dto.ToWarehouseId)
                    return BadRequest("FromWarehouseId and ToWarehouseId (different) are required for 'transfer'.");
                var removed = await RemoveStock(dto.ProductId, dto.FromWarehouseId.Value, dto.Quantity);
                if (!removed) return BadRequest("Insufficient stock for transfer.");
                await AddStock(dto.ProductId, dto.ToWarehouseId.Value, dto.Quantity);
                break;

            default:
                return BadRequest("Type must be 'in', 'out', or 'transfer'.");
        }

        await _db.SaveChangesAsync();
        return Ok(new { message = "Movement processed." });
    }

    private async Task AddStock(int productId, int warehouseId, int qty)
    {
        var item = await _db.InventoryItems
            .FirstOrDefaultAsync(ii => ii.ProductId == productId && ii.WarehouseId == warehouseId);

        if (item is null)
        {
            item = new Models.InventoryItem
            {
                ProductId = productId,
                WarehouseId = warehouseId,
                Quantity = qty
            };
            _db.InventoryItems.Add(item);
        }
        else
        {
            item.Quantity += qty;
        }
    }

    private async Task<bool> RemoveStock(int productId, int warehouseId, int qty)
    {
        var item = await _db.InventoryItems
            .FirstOrDefaultAsync(ii => ii.ProductId == productId && ii.WarehouseId == warehouseId);

        if (item is null || item.Quantity < qty) return false;

        item.Quantity -= qty;
        return true;
    }
}
