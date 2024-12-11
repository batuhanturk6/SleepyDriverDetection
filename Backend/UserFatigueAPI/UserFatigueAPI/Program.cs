using System;
using Microsoft.EntityFrameworkCore;
using UserFatigueAPI;

var builder = WebApplication.CreateBuilder(args);

// Kestrel yapılandırması: tüm IP adreslerinden bağlantıyı dinle
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(7248); // 7248 portunu tüm IP adreslerinden dinle
});

// Servisleri ekle
builder.Services.AddControllers();

// Swagger API dokümantasyonu ekleme
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// PostgreSQL için DbContext yapılandırması
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// MemoryCache ve Session desteği
builder.Services.AddDistributedMemoryCache(); // Bellek tabanlı geçici bellek
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Oturum süresi
    options.Cookie.HttpOnly = true; // Çerezlerin yalnızca HTTP üzerinden erişilebilir olması
    options.Cookie.IsEssential = true; // GDPR uyumluluğu için gerekli
});

// IMemoryCache servisini ekle (Cache için)
builder.Services.AddMemoryCache();

// CORS politikası ekle
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin() // Tüm kaynaklardan gelen isteklere izin ver
              .AllowAnyMethod() // Tüm HTTP metotlarına izin ver
              .AllowAnyHeader(); // Tüm başlıklara izin ver
    });
});

var app = builder.Build();

// Geliştirme ortamında Swagger etkinleştir
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// CORS'u etkinleştir
app.UseCors("AllowAll");

// Session middleware'i etkinleştir
app.UseSession();

app.UseAuthorization();

// Controller'ları eşle
app.MapControllers();

app.Run();
