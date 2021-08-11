using CodeBlue.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using System.Linq;

namespace CodeBlue.Services
{
    public class SqlExerciseService
    {
        CodeBlueContext _context;

        public SqlExerciseService(CodeBlueContext context, UserManager<Users> userManager)
        {
            _context = context;
        }

        public List<Exercise> Get() => _context.Exercises.ToList();

        public Exercise Get(int? id) => _context.Exercises.FirstOrDefault(e => e.Id == id);

        public Exercise GetExercicio(int? id, string r) 
        {
            var exercicio = _context.Exercises.FirstOrDefault(e => e.Id == id);
            if(exercicio.Resultado == r)
            {
                
                return exercicio ;
            }
            else
            {
                return null;
            }
           

        } 
        public bool Update(Exercise e)
        {
            try
            {
                var exists = Get(e.Id);
                if (exists == null) return false;
                if(e.Descricao != null)
                {
                    exists.Descricao = e.Descricao;
                }
                if (e.Resultado != null)
                {
                    exists.Resultado = e.Resultado;
                }
                if (e.PontosPremiacao != 0)
                {
                    exists.PontosPremiacao = e.PontosPremiacao;
                }

                _context.Exercises.Update(exists);
                _context.SaveChanges();
                e = exists;
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Delete(int id) 
        {
            try
            {
                
                _context.Exercises.Remove(Get(id));
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public bool Create(Exercise e)
        {
            try
            {
                var exists = Get(e.Id);
                if (exists != null) return false;
                _context.Exercises.Add(e);
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool isAvailable(int? exId, string userId)
        {
            return _context.Exercises.Where(e => e.Id == exId && e.Users.FirstOrDefault(u => u.Id == userId) != null).Count() == 0;
        }


    }
}
