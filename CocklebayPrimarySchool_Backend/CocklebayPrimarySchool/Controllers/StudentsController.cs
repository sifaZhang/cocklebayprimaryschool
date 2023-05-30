
namespace CocklebayPrimarySchool.Controllers;


[Route("api/[controller]")]
[ApiController]
public class StudentsController : ControllerBase
{
    private readonly SchoolDbContext schoolDbContext;

    public StudentsController(SchoolDbContext schoolDbContext)
    {
        this.schoolDbContext = schoolDbContext;
    }

    [HttpGet]
    public Student[] AllStudents()
    {
        return schoolDbContext.Student.ToArray();
    }

    [HttpGet("No/{StudentNo}")]
    public ActionResult<Student[]?> GetStudentByNo(string StudentNo)
    {
        Student[]? student = schoolDbContext.Student.Where(a => a.StudentNo == StudentNo).ToArray();
        if (student.Length < 1)
        {
            return NotFound("dont find the student");
        }
        else
        {
            return student;
        }
    }

    [HttpGet("Name/{FirstName}")]
    public ActionResult<Student[]?> GetStudentByName(string FirstName)
    {
        Student[]? student = schoolDbContext.Student.Where(a => a.FirstName == FirstName).ToArray();
        if (student.Length < 1)
        {
            return NotFound("dont find the student");
        }
        else
        {
            return student;
        }
    }

    [HttpGet("Room/{RoomNo}")]
    public ActionResult<Student[]?> RoomStudent(string RoomNo)
    {
        Student[]? student = schoolDbContext.Student.Where(b => b.RoomNo == RoomNo).ToArray();
        if (student.Length <1)
        {
            return NotFound("dont find the room");
        }
        else
        {
            return student;
        }
    }

    [HttpDelete("No/{StudentNo}")]
    public async Task DeleteStudent(string StudentNo)
    {
        Student? s = schoolDbContext.Student.SingleOrDefault(a => a.StudentNo == StudentNo);
        if (s == null)
        {
            return;
        }
        else
        {
            schoolDbContext.Student.Remove(s);

            ExamScore[]? scores = schoolDbContext.ExamScore.Where(a=>a.StudentNo== StudentNo).ToArray();
            schoolDbContext.ExamScore.RemoveRange(scores);

            await schoolDbContext.SaveChangesAsync();
        }
    }

    [HttpPost]
    public async Task<ActionResult<Student?>> AddStudent(Student student)
    {
        if (student.StudentNo != null)
        {
            Student? s = schoolDbContext.Student.SingleOrDefault(a => a.StudentNo == student.StudentNo);
            if (s != null)
            {
                return Conflict($"StudentNo:{student.StudentNo} has exist");
            }
            else
            {
                if (student.RoomNo != null)
                {
                    Room? r = schoolDbContext.Room.SingleOrDefault(a=>a.RoomNo == student.RoomNo);
                    if(r == null)
                    {
                        return NotFound($"StudentNo:{student.RoomNo} does not find.");
                    }
                }

                schoolDbContext.Student.Add(student);
                await schoolDbContext.SaveChangesAsync();
                return student;
            }
        }
        else
        {
            return BadRequest("please input StudentNo");
        }
    }

    [HttpPut]
    public async Task<ActionResult<Student?>> UpdateStudent(Student student)
    {
        if (student.StudentNo != null)
        {
            Student? s = schoolDbContext.Student.SingleOrDefault(a => a.StudentNo == student.StudentNo);
            if (s == null)
            {
                return NotFound($"Student:{student.StudentNo} does not find.");
            }
            else
            {
                if (student.RoomNo != null)
                {
                    Room? r = schoolDbContext.Room.SingleOrDefault(a => a.RoomNo == student.RoomNo);
                    if (r == null)
                    {
                        return NotFound($"StudentNo:{student.RoomNo} does not find.");
                    }
                }

                s.StudentNo = student.StudentNo;
                s.FirstName = student.FirstName;
                s.LastName = student.LastName;
                s.DateOfBirthday = student.DateOfBirthday;
                s.Gender = student.Gender;
                s.RoomNo = student.RoomNo;

                schoolDbContext.Student.Update(s);
                await schoolDbContext.SaveChangesAsync();
                return s;
            }
        }
        else
        {
            return BadRequest("please input SutdentNo");
        }
    }
}

