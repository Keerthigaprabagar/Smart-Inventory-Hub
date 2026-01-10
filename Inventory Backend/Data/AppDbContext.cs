using Inventory.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Inventory.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Warehouse> Warehouses => Set<Warehouse>();
    public DbSet<InventoryItem> InventoryItems => Set<InventoryItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>()
            .HasIndex(p => p.Sku)
            .IsUnique();

        modelBuilder.Entity<InventoryItem>()
            .HasIndex(ii => new { ii.ProductId, ii.WarehouseId })
            .IsUnique();

        modelBuilder.Entity<InventoryItem>()
            .Property(ii => ii.Quantity)
            .HasDefaultValue(0);

        // relationships
        modelBuilder.Entity<InventoryItem>()
            .HasOne(ii => ii.Product)
            .WithMany(p => p.InventoryItems)
            .HasForeignKey(ii => ii.ProductId);

        modelBuilder.Entity<InventoryItem>()
            .HasOne(ii => ii.Warehouse)
            .WithMany(w => w.InventoryItems)
            .HasForeignKey(ii => ii.WarehouseId);
    }
}
