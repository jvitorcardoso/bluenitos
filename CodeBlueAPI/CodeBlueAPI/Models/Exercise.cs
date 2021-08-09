using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeBlue.Models
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public string Resultado { get; set; }
        public List<Users> Users  { get; set; }
        public int PontosPremiacao { get; set; }
    }
}
