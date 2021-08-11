using CodeBlue.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace CodeBlue.Services
{
    public class SqlUsersService
    {
        CodeBlueContext _context;

        public SqlUsersService(CodeBlueContext context, UserManager<Users> userManager)
        {
            _context = context;
        }

        public List<Users> Get() => _context.Usuarios.ToList();
        public Users Get(string? id) => _context.Usuarios.FirstOrDefault(u => u.Id == id);

        public List<Users> Rank(int qtd)
        {
            return _context.Usuarios.FromSqlRaw("Select * from AspNetUsers").OrderByDescending(o => o.Pontuacao).Take(qtd).ToList();
        }


        public bool Update(Users u)
        {
            try
            {
                var exists = Get(u.Id);
                if (exists == null) return false;
                if(u.Nome != null)
                {
                    exists.Nome = u.Nome;
                }
                if (u.Sobrenome != null)
                {
                    exists.Sobrenome = u.Sobrenome;
                }
                if(u.Avatar != null)
                {
                    exists.Avatar = u.Avatar;
                }
                _context.Usuarios.Update(exists);
                _context.SaveChanges();
                u = exists;
                return true;
            }
            catch
            {
                return false;
            }
        }


        public bool Update(string? uid, int? eid)
        {
            try { 
                var ex = _context.Exercises.Find(eid);
                var usuariopontuado = this.Get(uid);
                usuariopontuado.Pontuacao += ex.PontosPremiacao;
                if(usuariopontuado.Exercises == null)
                {
                    usuariopontuado.Exercises = new List<Exercise>();
                }
                usuariopontuado.Exercises.Add(ex);
                _context.Usuarios.Update(usuariopontuado);
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Delete(string? id) 
        {
            try
            {
                
                _context.Usuarios.Remove(Get(id));
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public bool Create(Users u)
        {
            try
            {
                var exists = Get(u.Id);
                if (exists != null) return false;
                _context.Usuarios.Add(u);
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
            
    }
}
