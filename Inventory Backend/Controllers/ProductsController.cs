using Inventory.Api.Data;
using Inventory.Api.Dtos;
using Inventory.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Inventory.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ProductsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetAll()
    {
        var items = await _db.Products
            .OrderBy(p => p.Name)
            .Select(p => new ProductDto(p.Id, p.Sku, p.Name, p.UnitPrice, p.IsActive))
            .ToListAsync();
        return Ok(items);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProductDto>> GetById(int id)
    {
        var p = await _db.Products.FindAsync(id);
        if (p is null) return NotFound();
        return new ProductDto(p.Id, p.Sku, p.Name, p.UnitPrice, p.IsActive);
    }

    [HttpPost]
    public async Task<ActionResult<ProductDto>> Create(CreateProductDto dto)
    {
        var exists = await _db.Products.AnyAsync(x => x.Sku == dto.Sku);
        if (exists) return Conflict($"SKU '{dto.Sku}' already exists.");

        var p = new Product { Sku = dto.Sku, Name = dto.Name, UnitPrice = dto.UnitPrice };
        _db.Products.Add(p);
        await _db.SaveChangesAsync();
        var result = new ProductDto(p.Id, p.Sku, p.Name, p.UnitPrice, p.IsActive);
        return CreatedAtAction(nameof(GetById), new { id = p.Id }, result);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ProductDto>> Update(int id, UpdateProductDto dto)
    {
        var p = await _db.Products.FindAsync(id);
        if (p is null) return NotFound();
        var skuTaken = await _db.Products.AnyAsync(x => x.Sku == dto.Sku && x.Id != id);
        if (skuTaken) return Conflict($"SKU '{dto.Sku}' already exists.");

        p.Sku = dto.Sku;
        p.Name = dto.Name;
        p.UnitPrice = dto.UnitPrice;
        p.IsActive = dto.IsActive;
        await _db.SaveChangesAsync();
        return new ProductDto(p.Id, p.Sku, p.Name, p.UnitPrice, p.IsActive);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var p = await _db.Products.FindAsync(id);
        if (p is null) return NotFound();
        _db.Products.Remove(p);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
