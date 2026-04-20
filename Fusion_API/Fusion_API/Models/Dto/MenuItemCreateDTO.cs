using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Fusion_API.Models.Dto
{
    public class MenuItemCreateDTO
    {
          
        [Required]
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; } 

        public string Category { get; set; } = string.Empty;

        public string? SpecialTag { get; set; } 
        [Range(1, 1000)]
        public double Price { get; set; } 
        [Required]
        public IFormFile File { get; set; } = null!;
    }
}
