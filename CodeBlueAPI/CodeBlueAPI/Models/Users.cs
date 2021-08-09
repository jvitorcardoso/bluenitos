using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace CodeBlue.Models
{
    public class Users : IdentityUser
    {
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public int Pontuacao { get; set; }
        public string Avatar { get; set; }
        public List<Exercise> Exercises { get; set; }
    }
}
