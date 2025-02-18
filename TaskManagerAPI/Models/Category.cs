using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagerAPI.Models
{
    [Table("Categories")]
    public class Category
    {
        [Key]
        [Column("CategoryId")]
        public int CategoryId { get; set; }

        [Required]
        [Column("CatName")]
        public string CatName { get; set; }

        [Column("CatDesc")]
        public string? CatDesc { get; set; }

        // Navigation property (optional)
        public ICollection<TaskItem>? Tasks { get; set; }
    }
}
