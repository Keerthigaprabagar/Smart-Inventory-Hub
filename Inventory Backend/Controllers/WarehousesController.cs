using Inventory.Api.Data;
using Inventory.Api.Dtos;
using Inventory.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Inventory.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WarehousesController : ControllerBase
{
    private readonly AppDbContext _db;

    public WarehousesController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<WarehouseDto>>> GetAll()
    {
        var items = await _db.Warehouses
            .OrderBy(w => w.Name)
            .Select(w => new WarehouseDto(w.Id, w.Name, w.Location))
            .ToListAsync();
        return Ok(items);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<WarehouseDto>> GetById(int id)
    {
        var w = await _db.Warehouses.FindAsync(id);
        if (w is null) return NotFound();
        return new WarehouseDto(w.Id, w.Name, w.Location);
    }

    [HttpPost]
    public async Task<ActionResult<WarehouseDto>> Create(CreateWarehouseDto dto)
    {
        var w = new Warehouse { Name = dto.Name, Location = dto.Location };
        _db.Warehouses.Add(w);
        await _db.SaveChangesAsync();
        var result = new WarehouseDto(w.Id, w.Name, w.Location);
        return CreatedAtAction(nameof(GetById), new { id = w.Id }, result);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<WarehouseDto>> Update(int id, UpdateWarehouseDto dto)
    {
        var w = await _db.Warehouses.FindAsync(id);
        if (w is null) return NotFound();

        w.Name = dto.Name;
        w.Location = dto.Location;
        await _db.SaveChangesAsync();
        return new WarehouseDto(w.Id, w.Name, w.Location);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var w = await _db.Warehouses.FindAsync(id);
        if (w is null) return NotFound();
        _db.Warehouses.Remove(w);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
