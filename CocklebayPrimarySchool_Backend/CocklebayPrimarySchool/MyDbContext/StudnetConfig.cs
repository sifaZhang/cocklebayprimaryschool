using Microsoft.EntityFrameworkCore;

namespace CocklebayPrimarySchool
{
    public class StudnetConfig : IEntityTypeConfiguration<Student>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Student> builder)
        {
            builder.ToTable("Students");
            builder.HasKey(t => t.StudentNo);
            builder.Property("StudentNo").IsRequired();
        }
    }
}
