

namespace CocklebayPrimarySchool.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TeachersController : ControllerBase
{
    private readonly SchoolDbContext schoolDbContext;

    public TeachersController(SchoolDbContext schoolDbContext)
    {
        this.schoolDbContext = schoolDbContext;
    }
   
    [HttpGet]
    public Teacher[] AllTeachers()
    {
        return schoolDbContext.Teacher.ToArray();
    }

    [HttpGet("No/{TeacherNo}")]
    public ActionResult<Teacher[]?> TeacherByNo(string TeacherNo)
    {
        List<Teacher>? t = schoolDbContext.Teacher.Where(a => a.TeacherNo == TeacherNo).ToArray().ToList();
        if (t is null)
        {
            return NotFound("don't find the user.");
        }
        else
        {
            return t.ToArray();
        }
    }

    [HttpGet("Name/{FirstName}")]
    public ActionResult<Teacher[]?> ATeacher(string FirstName)
    {
        List<Teacher>? t = schoolDbContext.Teacher.Where(a => a.FirstName == FirstName).ToArray().ToList();
        if (t != null || t.Count > 0)
        {
            return t.ToArray();
        }
        else
        {
            return NotFound("don't find the user.");
        }
    }

    [HttpPost]
    public async Task<ActionResult<Teacher>> AddTeacher([FromBody] Teacher teacher)
    {
        if (teacher.TeacherNo == null || teacher.TeacherNo == "")
        {
            return BadRequest("please input teacherNo.");
        }
        else
        {
            schoolDbContext.Teacher.Add(teacher);

            await schoolDbContext.SaveChangesAsync();
            return teacher;
        }
    }

    [HttpPut]
    public async Task<ActionResult<Teacher>?> UpdateaTeacher(Teacher teacher)
    {
        Teacher? t1 = schoolDbContext.Teacher.SingleOrDefault(a => a.TeacherNo == teacher.TeacherNo);
        if (t1 == null)
        {
            return NotFound("Don't find the teacher!");
        }
        else
        {
            t1.TeacherNo = teacher.TeacherNo;
            t1.FirstName = teacher.FirstName;
            t1.LastName = teacher.LastName;
            t1.Gender = teacher.Gender;
            t1.Email = teacher.Email;
            t1.DateOfBirthday = teacher.DateOfBirthday;

            schoolDbContext.Teacher.Update(t1);
            await schoolDbContext.SaveChangesAsync();
            return t1;
        }
    }


    [HttpDelete("No")]
    public async Task<ActionResult> DeleteTeacher(string[] TeacherNos)
    {
        foreach (string i in TeacherNos)
        {
            Teacher? t = schoolDbContext.Teacher.SingleOrDefault(a => a.TeacherNo == i);
            if (t != null)
            {
                schoolDbContext.Remove(t);
            }
        }

        await schoolDbContext.SaveChangesAsync();

        return Ok();
    }
}
