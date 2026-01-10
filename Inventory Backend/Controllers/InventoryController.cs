using Inventory.Api.Data;
using Inventory.Api.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Inventory.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InventoryController : ControllerBase
{
    private readonly AppDbContext _db;

    public InventoryController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<InventoryDto>>> GetAll()
    {
        var items = await _db.InventoryItems
            .Include(ii => ii.Product)
            .Include(ii => ii.Warehouse)
            .OrderBy(ii => ii.Product.Name)
            .Select(ii => new InventoryDto(
                ii.Id, ii.ProductId, ii.Product.Sku, ii.Product.Name,
                ii.WarehouseId, ii.Warehouse.Name, ii.Quantity))
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("by-product/{productId:int}")]
    public async Task<ActionResult<IEnumerable<InventoryDto>>> ByProduct(int productId)
    {
        var items = await _db.InventoryItems
            .Where(ii => ii.ProductId == productId)
            .Include(ii => ii.Product)
            .Include(ii => ii.Warehouse)
            .Select(ii => new InventoryDto(
                ii.Id, ii.ProductId, ii.Product.Sku, ii.Product.Name,
                ii.WarehouseId, ii.Warehouse.Name, ii.Quantity))
            .ToListAsync();
        return Ok(items);
    }

    [HttpGet("low-stock")]
    public async Task<ActionResult<IEnumerable<InventoryDto>>> LowStock([FromQuery] int threshold = 5, [FromQuery] int? warehouseId = null)
    {
        var query = _db.InventoryItems
            .Include(ii => ii.Product)
            .Include(ii => ii.Warehouse)
            .AsQueryable();

        if (warehouseId.HasValue)
            query = query.Where(ii => ii.WarehouseId == warehouseId);

        var items = await query
            .Where(ii => ii.Quantity <= threshold)
            .Select(ii => new InventoryDto(
                ii.Id, ii.ProductId, ii.Product.Sku, ii.Product.Name,
                ii.WarehouseId, ii.Warehouse.Name, ii.Quantity))
            .ToListAsync();

        return Ok(items);
    }
}
