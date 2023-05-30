using Microsoft.EntityFrameworkCore;

namespace CocklebayPrimarySchool
{
    public class ExamSocreConfig : IEntityTypeConfiguration<ExamScore>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<ExamScore> builder)
        {
            builder.ToTable("ExamScores");
        }
    }
}
