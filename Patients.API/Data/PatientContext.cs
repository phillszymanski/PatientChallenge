using Microsoft.EntityFrameworkCore;
using Patients.API.Data.Models;

namespace Patients.API.Data
{
    public class ChallengeContext : DbContext
    {

        protected readonly IConfiguration Configuration;

        public ChallengeContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        //public ChallengeContext(DbContextOptions<ChallengeContext> options) : base(options) { }

        public DbSet<Patient> Patients { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlite(Configuration.GetConnectionString("WebApiDatabase"));
        }
    }
}
