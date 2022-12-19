using Microsoft.EntityFrameworkCore;
using Patients.API.Data.Models;

namespace Patients.API.Data
{
    public class ChallengeContext : DbContext
    {
        public ChallengeContext(DbContextOptions<ChallengeContext> options) : base(options) { }

        public DbSet<Patient> Patients { get; set; }


    }
}
