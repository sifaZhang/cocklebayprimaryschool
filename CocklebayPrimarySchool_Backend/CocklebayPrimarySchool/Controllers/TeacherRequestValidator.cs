using Azure.Core;
using FluentValidation;
using System.Runtime.CompilerServices;

namespace CocklebayPrimarySchool.Controllers
{
    public class TeacherRequestValidator:AbstractValidator<Teacher>
    {
        public TeacherRequestValidator()
        {
            RuleFor(x => x.TeacherNo).NotNull().WithMessage("TeacherNo不能为空1");
            RuleFor(x => x.TeacherNo).NotEmpty().WithMessage("TeacherNo不能为空2");
        }
    }
}
