using Patients.API.Data;
using Patients.API.Data.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//string connString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ChallengeContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("PhillsAzure")));
//builder.Services.AddDbContext<ChallengeContext>(opt => opt.UseInMemoryDatabase("Challenge"));
builder.Services.AddScoped<IPatientService, PatientService>();

builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseAuthorization();

app.MapControllers();

app.Run();
