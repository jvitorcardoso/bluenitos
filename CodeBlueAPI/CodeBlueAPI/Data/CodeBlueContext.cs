using CodeBlue.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeBlue
{
    public class CodeBlueContext: IdentityDbContext
    {
        public CodeBlueContext(DbContextOptions options) : base(options)
        {}

        
        public DbSet<Users> Usuarios { get; set; }
        public DbSet<Exercise> Exercises { get; set; }

    }
}
