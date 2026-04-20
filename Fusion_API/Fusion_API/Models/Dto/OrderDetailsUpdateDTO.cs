using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Fusion_API.Models.Dto
{
    public class OrderDetailsUpdateDTO
    {
        [Required]
        public int OrderDetailId { get; set; }
       
        [Required]
        [Range(1,5)]
        public int Rating { get; set; } 
    }
}
