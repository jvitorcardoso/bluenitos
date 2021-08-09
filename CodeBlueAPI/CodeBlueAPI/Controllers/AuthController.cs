using CodeBlue.Models;
using CodeBlue.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace CodeBlue.Controllers
{
    [Route("api/[controller]"), ApiController]    
    public class AuthController : ControllerBase
    {
        AuthService _authService;
        SqlUsersService _sqlUsersService;
                
        public AuthController(AuthService authService, SqlUsersService sqlUsersService)
        {
            _authService = authService;
            _sqlUsersService = sqlUsersService;
            
        }
        /// <summary>
        /// Endpoint responsável por criar um login de acesso a aplicação, Informar: Username, Email, PasswordHash, Nome e Sobrenome JSON
        /// </summary>
        /// <param name="_user"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Register")]
        public IActionResult Register([FromBody] Users _user)
        {
            
            try
            {
                var result = _authService.Create(_user).Result;
                if (result.Succeeded)
                {                    
                    _user.PasswordHash = default;
                    _user.SecurityStamp = default;
                    _user.ConcurrencyStamp = default;

                    return Ok(_user);
                }

                
                return BadRequest();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Endpoint responsável pela geração do Token de segurança. Informar : Email e PasswordHash JSON
        /// </summary>
        /// <param name="_user"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Token")]
        public IActionResult Token([FromBody] Users _user)
        {
            try
            {
                return Ok(_authService.GenerateToken(_user));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Endpoint responsável por retornar o usuário que está logado no momento.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("LoggedUser")]
        public IActionResult Logged()
        {
            var user = User.Identity.Name;
            var userBD = _sqlUsersService.Get().ToList();
            var userID = userBD.FirstOrDefault(u => u.UserName == user);
            if(userID == null)
            {
                return NotFound("Nenhum usuário logado no momento");
            }
            return Ok(_sqlUsersService.Get(userID.Id));          
        }
    }
}
