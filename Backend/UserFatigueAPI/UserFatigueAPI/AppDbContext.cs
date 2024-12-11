using Microsoft.EntityFrameworkCore;
using UserFatigueAPI.Models;

namespace UserFatigueAPI
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // Veritabanı tablolarını temsil eden DbSet'ler
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User tablosunun yapılandırması
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id); // Birincil anahtar
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Surname).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(150);
                entity.Property(e => e.Password).IsRequired();
                entity.Property(e => e.Age).IsRequired();
            });
        }
    }
}
