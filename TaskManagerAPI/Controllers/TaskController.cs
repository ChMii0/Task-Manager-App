using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Data;
using TaskManagerAPI.Models;
using TaskManagerAPI.DTOs;

namespace TaskManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly TaskDbContext _context;

        public TaskController(TaskDbContext context) 
        {
            _context = context;
        }

        //GET: api/task
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        //GET: api/ask/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItem>> GetTask(int id)
        {
            var taskItem = await _context.Tasks.FindAsync(id);
            if (taskItem == null)
            {
                return NotFound();
            }
            return taskItem;
        }

        // POST: api/task
        [HttpPost]
        public async Task<ActionResult<TaskItem>> CreateTask([FromBody] TaskItem taskItem)
        {
            if (string.IsNullOrEmpty(taskItem.Title))
            {
                return BadRequest("Task title is required.");
            }

            // Set default values for missing fields
            taskItem.IsCompleted = false; 
            taskItem.DueDate ??= DateTime.UtcNow.AddDays(7); 
            taskItem.TaskPrio ??= "Medium"; 
            taskItem.CategoryId = taskItem.CategoryId > 0 ? taskItem.CategoryId : 1; 
            taskItem.UserId = taskItem.UserId > 0 ? taskItem.UserId : 1; 
            taskItem.CreatedAt = DateTime.UtcNow; 


            _context.Tasks.Add(taskItem);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTask), new { id = taskItem.TaskId }, taskItem);
        }

        //PATCH: api/task/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] TaskUpdateDTO updateDTO)
        {
            if (updateDTO == null)
            {
                return BadRequest("Invalid update data.");
            }

            var taskItem = await _context.Tasks.FindAsync(id);
            if (taskItem == null)
            {
                return NotFound();
            }

            // Update only provided fields
            if (updateDTO.IsCompleted.HasValue)
            {
                taskItem.IsCompleted = updateDTO.IsCompleted.Value;
            }
            if (!string.IsNullOrEmpty(updateDTO.Title))
            {
                taskItem.Title = updateDTO.Title;
            }
            if (!string.IsNullOrEmpty(updateDTO.TaskDesc))
            {
                taskItem.TaskDesc = updateDTO.TaskDesc;
            }
            if (updateDTO.DueDate.HasValue)
            {
                taskItem.DueDate = updateDTO.DueDate.Value;
            }
            if (!string.IsNullOrEmpty(updateDTO.TaskPrio))
            {
                taskItem.TaskPrio = updateDTO.TaskPrio;
            }
            if (updateDTO.CategoryId.HasValue)
            {
                taskItem.CategoryId = updateDTO.CategoryId.Value;
            }
            if (updateDTO.UserId.HasValue)
            {
                taskItem.UserId = updateDTO.UserId.Value;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok(new { message = "Task updated successfully." });
        }

        //DELETE: api/task/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var taskItem = await _context.Tasks.FindAsync(id);
            if (taskItem == null)
            {
                return NotFound();
            }
            _context.Tasks.Remove(taskItem);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool TaskExists(int id)
        {
            return _context.Tasks.Any(e => e.TaskId == id);
        }
    }
}

