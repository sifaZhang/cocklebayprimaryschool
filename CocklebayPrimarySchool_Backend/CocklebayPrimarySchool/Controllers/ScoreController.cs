
using System.Diagnostics.CodeAnalysis;
using System.Linq;

namespace CocklebayPrimarySchool.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ScoreController : ControllerBase
{
    private readonly SchoolDbContext schoolDbContext;

    public ScoreController(SchoolDbContext schoolDbContext)
    {
        this.schoolDbContext = schoolDbContext;
    }

    [HttpGet]
    public ActionResult<ExamScore[]?> GetAllExamScores()
    {
       return schoolDbContext.ExamScore.ToArray();
    }

    [HttpGet("StudentNo/{StudentNo}")]
    public ActionResult<ExamScore[]?> GetExamScores(string StudentNo)
    {
        ExamScore[]? s = schoolDbContext.ExamScore.Where(a => a.StudentNo == StudentNo).ToArray();
        if (s.Length > 0)
        {
            return s;
        }
        else
        {
            return NotFound("dont find this student");
        }
    }

    [HttpGet("StudentNo/{StudentNo}/Subject/{Subject}")]
    public ActionResult<ExamScore[]?> GetExamScore(string StudentNo, string? Subject)
    {
        ExamScore[]? s = schoolDbContext.ExamScore.Where(a => a.StudentNo == StudentNo && a.Subject == Subject).ToArray();
        if (s.Length > 0)
        {
            return s;
        }
        else
        {
            return NotFound("dont find this student");
        }
    }

    [HttpGet("RoomNo/{RoomNo}")]
    public ActionResult<ExamScore[]?> GetExamScoreByRoom(string RoomNo)
    {
        List<ExamScore> examScores = new List<ExamScore>();
        Student[]? Students = schoolDbContext.Student.Where(a => a.RoomNo == RoomNo).ToArray();
        foreach (var item in Students)
        {
            List<ExamScore>? examScore = schoolDbContext.ExamScore.Where(a => a.StudentNo == item.StudentNo).ToList();
            examScores.AddRange(examScore);
        }

        return examScores.ToArray();
    }

    [HttpGet("RoomNo/{RoomNo}/Subject/{Subject}")]
    public ActionResult<ExamScore[]?> GetExamScoreByRoom(string RoomNo, string? Subject)
    {
        List<ExamScore> examScores = new List<ExamScore>();
        Student[]? Students = schoolDbContext.Student.Where(a => a.RoomNo == RoomNo).ToArray();
        foreach(var item in Students) 
        {
            List<ExamScore>? examScore = schoolDbContext.ExamScore.Where(a => a.StudentNo == item.StudentNo && a.Subject == Subject).ToList();
            examScores.AddRange(examScore);
        }

        return examScores.ToArray();
    }

    [HttpPost]
    public async Task<ActionResult<ExamScore>> AddSocre(ExamScore cExamScore)
    {
        if (cExamScore.StudentNo != null)
        {
            Student? s = schoolDbContext.Student.SingleOrDefault(a => a.StudentNo == cExamScore.StudentNo);

            if (s == null)
            {
                return BadRequest("dont find the student.");
            }
        }

        schoolDbContext.ExamScore.Add(cExamScore);
        await schoolDbContext.SaveChangesAsync();

        return cExamScore;
    }

    [HttpPut]
    public async Task<ActionResult<ExamScore>> updateScore(ExamScore cExamScore)
    {
        ExamScore? e = schoolDbContext.ExamScore.SingleOrDefault(a => a.Id == cExamScore.Id);
            if (e == null)
        {
            return BadRequest("dont find the ExamScore.");
        }
        else
        {
            if (cExamScore.StudentNo != null)
            {
                Student? s = schoolDbContext.Student.SingleOrDefault(a => a.StudentNo == cExamScore.StudentNo);

                if (s == null)
                {
                    return BadRequest("dont find the student.");
                }
            }

            e.StudentNo = cExamScore.StudentNo;
            e.Subject = cExamScore.Subject;
            e.Score = cExamScore.Score;
            e.Grade = cExamScore.Grade;
            e.TestDate = cExamScore.TestDate;

            schoolDbContext.ExamScore.Update(e);
            await schoolDbContext.SaveChangesAsync();
            return e;
        }
    }

    [HttpDelete("Id/{Id}")]
    public async Task DeleteScore(int Id)
    {
        ExamScore? s = schoolDbContext.ExamScore.SingleOrDefault(a => a.Id == Id);
        if (s != null)
        {
            schoolDbContext.Remove(s);

            await schoolDbContext.SaveChangesAsync();
        }
    }

    [HttpDelete("StudentNo/{StudentNo}")]
    public async Task DeleteStudentScore(string StudentNo)
    {
        ExamScore[] ? s = schoolDbContext.ExamScore.Where(a => a.StudentNo == StudentNo).ToArray();
        if (s.Length > 0)
        {
            foreach (var item in s)
            {
                schoolDbContext.Remove(item);
            }
            
            await schoolDbContext.SaveChangesAsync();
        }
    }
}
