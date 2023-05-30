using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CocklebayPrimarySchool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly SchoolDbContext schoolDbContext;

        public RoomController(SchoolDbContext schoolDbContext)
        {
            this.schoolDbContext = schoolDbContext;
        }


        [HttpGet]
        public Room[] GetAllRooms()
        {
            return schoolDbContext.Room.ToArray();
        }

        [HttpGet("RoomNo/{RoomNo}")]
        public ActionResult<Room[]>? GetAllRoomsByRoom(string RoomNo)
        {
            Room[]? room = schoolDbContext.Room.Where(a => a.RoomNo == RoomNo).ToArray();
            if (room.Length > 0)
            {
                return room;
            }
            else
            {
                return NotFound("dont find the room");
            }
        }

        [HttpGet("TeacherNo/{TeacherNo}")]
        public ActionResult<Room[]>? GetAllRoomsByTeacher(string TeacherNo)
        {
            Room[]? room = schoolDbContext.Room.Where(a => a.TeacherNo == TeacherNo).ToArray();
            if (room.Length > 0)
            {
                return room;
            }
            else
            {
                return NotFound("dont find the room");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Room>> AddRoom(Room croom)
        {
            if (croom.RoomNo == null )
            {
                return BadRequest("please input RoomNo");
            }
            else
            {
                Room? r = schoolDbContext.Room.SingleOrDefault(a=>a.RoomNo == croom.RoomNo);
                if (r == null)
                {
                    Teacher? t = schoolDbContext.Teacher.SingleOrDefault(a => a.TeacherNo == croom.TeacherNo);
                    if (croom.TeacherNo != null && t == null)
                    {
                        return NotFound($"Dont find TeacherNo:{croom.TeacherNo}");
                    }
                    else
                    {
                        schoolDbContext.Room.Add(croom);
                        await schoolDbContext.SaveChangesAsync();
                        return croom;
                    }
                }
                else
                {
                    return NotFound("the room has exist");
                }
            }
        }

        [HttpDelete("No/{RoomNo}")]
        public async Task DeleteRoom(string RoomNo)
        {
            List<Room>? r = schoolDbContext.Room.Where(a => a.RoomNo == RoomNo).ToList();
            if (r.Count == 0)
            {

            }
            else
            {
                foreach (var item in r)
                {
                    schoolDbContext.Room.Remove(item);
                }

                await schoolDbContext.SaveChangesAsync();
            }
        }

        [HttpPut]
        public async Task<ActionResult<Room>> UpdateRoom(Room croom)
        {
            if (croom.RoomNo == null)
            {
                return BadRequest("please input all parameter");
            }
            else
            {
                Room? r = schoolDbContext.Room.SingleOrDefault(a => a.RoomNo == croom.RoomNo);
                if (r != null)
                {
                    Teacher? t = schoolDbContext.Teacher.SingleOrDefault(a => a.TeacherNo == croom.TeacherNo);
                    if (croom.TeacherNo != null && t == null)
                    {
                        return NotFound($"Dont find TeacherNo:{croom.TeacherNo}");
                    }
                    else
                    {
                        r.RoomNo = croom.RoomNo;
                        r.TeacherNo = croom.TeacherNo;

                        schoolDbContext.Room.Update(r);
                        await schoolDbContext.SaveChangesAsync();
                        return r;
                    }
                }
                else
                {
                    return NotFound("the room does not exist");
                }
            }
        }
    }
}
