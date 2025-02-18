using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagerAPI.Models
{
    [Table("Tasks")]
    public class TaskItem
    {
        [Key]
        [Column("TaskId")]
        public int TaskId { get; set; }

        [Required]
        [Column("Title")]
        public string Title { get; set; }

        [Column("TaskDesc")]
        public string? TaskDesc { get; set; }

        [Column("IsCompleted")]
        public bool IsCompleted { get; set; }

        [Column("DueDate")]
        public DateTime? DueDate { get; set; }

        [Column("TaskPrio")]
        public string? TaskPrio { get; set; }

        [Column("CategoryId")]
        public int? CategoryId { get; set; }

        [Column("UserId")]
        public int UserId { get; set; }

        [Column("CreatedAt")]
        public DateTime? CreatedAt { get; set; }

        // Navigation properties (optional for JOINs later)
        public Category? Category { get; set; }
        public User? User { get; set; }
    }
}

