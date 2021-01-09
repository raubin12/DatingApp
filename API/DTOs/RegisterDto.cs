using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        //Data Transfert Object

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

    }
}