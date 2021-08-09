using CodeBlue.Models;
using CodeBlue.Roles;
using CodeBlue.Services;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;

namespace CodeBlue.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExercisesController : ControllerBase
    {
        SqlExerciseService _service;
        SqlUsersService _usersService;
        CodeBlueContext _context;

        public ExercisesController(SqlExerciseService service, SqlUsersService service2, CodeBlueContext context)
        {
            _service = service;
            _usersService = service2;
            _context = context;
        }

        /// <summary>
        /// Endpoint responsável pela criação dos exercícios. Informar: Descrição, Resultado e PontosPremiacao JSON
        /// </summary>
        /// <param name="e"></param>
        /// <returns></returns>
        [HttpPost]
        [RoleAuthorize(RoleTypes.SuperAdmin, RoleTypes.Professor, RoleTypes.Aluno)]
        public IActionResult Create([FromBody] Exercise e)
        {

            return _service.Create(e) ? Ok(_service.Get(e.Id)) : NotFound("Erro ao criar Exercícios.");
        }

        /// <summary>
        /// Endpoint responsável por buscar a lista completa de exercícios no banco de dados.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [RoleAuthorize(RoleTypes.SuperAdmin, RoleTypes.Professor, RoleTypes.Aluno)]
        public IActionResult GetAll() => Ok(_service.Get());

      
        /// <summary>
        /// Endpoint responsável por buscar o exercício relacionado pelo seu ID ou buscar pelo ID comparando com o resultado encontrado pelo usuário. ID obrigatório, resultado passando via Header.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="resultado"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        [RoleAuthorize(RoleTypes.SuperAdmin, RoleTypes.Professor, RoleTypes.Aluno)]
        public IActionResult Get(int? id, [FromHeader]string? resultado = null)
        {
            if (resultado != null)
            {
                if (_service.GetExercicio(id, resultado) != null)
                {
                    var IdUsuario = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

                    if (_service.isAvailable(id, IdUsuario))
                    {
                        return _usersService.Update(IdUsuario, id) ?
                            Ok("Você acertou o desafio!") :
                            Problem("Erro!!");
                    }
                    return Ok("Usuário ja realizou este mesmo desafio.");
                }
                else
                {
                    return NotFound("Você errou o desafio!");
                }
            }
            return _service.Get(id) != null ? Ok(_service.Get(id)) : NotFound("Exercício não encontrado.");
        }
           

        /// <summary>
        /// Endpoint responsável por editar dados de um exercício cadastrado. Informar: Descrição, Resultado e PontosPremiacao JSON
        /// </summary>
        /// <param name="u"></param>
        /// <returns></returns>
        [HttpPut]
        [RoleAuthorize(RoleTypes.SuperAdmin, RoleTypes.Professor, RoleTypes.Aluno)]
        public IActionResult Update([FromBody] Exercise e)
        {
            //e.Id = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            return _service.Update(e) ? Ok(_service.Get(e.Id)) : NotFound("Erro ao atualizar Usuário");
        }

        /// <summary>
        /// Endpoint responsável por deletar exercícios pelo seu Id, somente Usuários com perfil SuperAdmin tem permissão.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("{id}")]
        [RoleAuthorize(RoleTypes.SuperAdmin, RoleTypes.Professor, RoleTypes.Aluno)]

        public IActionResult Delete(int id) => _service.Delete(id) ? Ok() : NotFound("Usuário não existe");

        

    }
}
