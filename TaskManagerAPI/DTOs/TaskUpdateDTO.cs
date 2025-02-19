namespace TaskManagerAPI.DTOs
{
    public class TaskUpdateDTO
    {
        public bool? IsCompleted { get; set; }
        public string? Title { get; set; }
        public string? TaskDesc { get; set; }
        public DateTime? DueDate { get; set; }
        public string? TaskPrio { get; set; }
        public int? CategoryId { get; set; }
        public int? UserId { get; set; }
    }
}
