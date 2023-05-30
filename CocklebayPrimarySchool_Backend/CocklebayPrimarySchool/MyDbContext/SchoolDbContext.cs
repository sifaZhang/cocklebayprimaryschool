using Microsoft.EntityFrameworkCore;

namespace CocklebayPrimarySchool
{
    public class SchoolDbContext:DbContext
    {
        public SchoolDbContext(DbContextOptions<SchoolDbContext> options) : base(options)
        {
            
        }

        public DbSet<Teacher> Teacher { get; set; }
        public DbSet<Student> Student { get; set; }

        public DbSet<ExamScore> ExamScore { get; set; }

        public DbSet<Room> Room { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(this.GetType().Assembly);
        }
    }
}
