using CodeBlue.Models;
using CodeBlue.Roles;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeBlue.Data
{
    public static class SeedData
    {
        public static void InitDatabase(IServiceProvider serviceProvider)
        {
            using 
                (var context = new CodeBlueContext(
                    serviceProvider.GetRequiredService<DbContextOptions<CodeBlueContext>>()
                )
            ) 
            {
                context.Database.Migrate();
               
                var RoleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                string[] roleNames = Enum.GetNames(typeof(RoleTypes));

                foreach (var role in roleNames)
                {
                    if (!RoleManager.RoleExistsAsync(role).Result)
                    {
                        RoleManager.CreateAsync(new IdentityRole { Name = role }).Wait();
                    }
                }
            }
        }
    }
}
