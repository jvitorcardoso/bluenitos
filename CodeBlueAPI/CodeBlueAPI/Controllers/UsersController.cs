using CodeBlue.Models;
using CodeBlue.Roles;
using CodeBlue.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;

namespace CodeBlue.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        SqlUsersService _service;

        public UsersController(SqlUsersService service)
        {
            _service = service;
        }        

        /// <summary>
        /// Endopoint responsável por buscar a lista completa de usuários cadastrados na aplicação.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [RoleAuthorize(RoleTypes.SuperAdmin, RoleTypes.Professor, RoleTypes.Aluno)]
        public IActionResult GetAll() => Ok(_service.Get());


        /// <summary>
        /// Endpoint responsável por buscar um usuário específico, tendo seu Id como parâmetro.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        [RoleAuthorize(RoleTypes.SuperAdmin, RoleTypes.Professor, RoleTypes.Aluno)]
        public IActionResult Get(string id) => _service.Get(id) != null ? Ok(_service.Get(id)) : NotFound("Usuário não existe");
        
        
        /// <summary>
        /// Endpoint responsável por editar dados de um usuário cadastrado. Informar: Nome e Sobrenome JSON
        /// </summary>
        /// <param name="u"></param>
        /// <returns></returns>
        [HttpPut]
        [RoleAuthorize(RoleTypes.SuperAdmin, RoleTypes.Professor, RoleTypes.Aluno)]
        public IActionResult Update([FromBody] Users u)
        {
            u.Id = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            return _service.Update(u) ? Ok(_service.Get(u.Id)) : NotFound("Erro ao atualizar Usuário");
        }

        /// <summary>
        /// Endpoint responsável por deletar usuários pelo seu Id, somente Usuários com perfil SuperAdmin tem permissão.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("{id}")]
        [RoleAuthorize(RoleTypes.SuperAdmin)]

        public IActionResult Delete(string id) => _service.Delete(id) ? Ok() : NotFound("Usuário não existe");
        /// <summary>
        /// Endpoint responsável por retornar uma lista de usuários ordenada por sua pontuação. Como parâmetro devemos informar a quantidade desejada. 
        /// </summary>
        /// <param name="qtd"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("rank/{qtd}")]
        [AllowAnonymous]
        public IActionResult Get(int qtd) => _service.Rank(qtd) != null ? Ok(_service.Rank(qtd)) : NotFound("Usuários não encontrados.");

    }
}
