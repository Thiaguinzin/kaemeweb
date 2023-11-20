using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Dominio.Interface;
using Dominio.Models;
using Dominio.Models.UsuarioModels;
using Microsoft.IdentityModel.Tokens;
using Shared.RepositoryShared;

namespace Dominio.Services
{
    public class UsuarioService
    {
        private IUsuarioRepository _usuarioRepository;
        private IConfiguration _config;

        public UsuarioService(IUsuarioRepository usuarioRepository, IConfiguration configuration)
        {
            _usuarioRepository = usuarioRepository;
            _config = configuration;
        }


        public RepositoryResult Create(Usuario usuario)
        {
            try
            {
                var result = _usuarioRepository.Create(usuario);
                return RepositoryResult.AddDapper(result);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }

        public RepositoryResult Update(Usuario usuario)
        {
            try
            {
                var result = _usuarioRepository.Update(usuario);
                return RepositoryResult.AddDapper(result);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }

        public RepositoryResult Delete(int id)
        {
            try
            {
                var result = _usuarioRepository.Delete(id);
                return RepositoryResult.AddDapper(result);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }        

        public async Task<RepositoryResult> GetAll()
        {
            try
            {
                var usuarios = await _usuarioRepository.GetAll();
                return RepositoryResult.AddDapper(usuarios);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }

        public async Task<RepositoryResult> GetUsuarioByLogin(string login)
        {
            try
            {
                var usuario = await _usuarioRepository.GetUsuarioByLogin(login);
                return RepositoryResult.AddDapper(usuario);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }            
        }

        public async Task<RepositoryResult> GetUsuarioById(int id)
        {
            try
            {
                var usuario = await _usuarioRepository.GetUsuarioById(id);
                return RepositoryResult.AddDapper(usuario);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }            
        }        

        public RepositoryResult GetUsuarioBySearch(string? login, string? nome, string? perfil_id, bool? ativo)
        {
            try
            {
                var usuario = _usuarioRepository.GetUsuarioBySearch(login, nome, perfil_id, ativo);
                return RepositoryResult.AddDapper(usuario);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }            
        }        

        public async Task<RepositoryResult> Login(UsuarioLogin usuarioLogin)
        {
            try
            {
                var resultIsValideUser = await IsValideUser(usuarioLogin);
                if (resultIsValideUser.Item1.Equals("Ok"))
                {

                var result = CreateToken(resultIsValideUser.Item2);
                
                return RepositoryResult.AddDapper(new 
                {
                    Authenticated = true,
                    Token = result.Item1,
                    Expiracao = result.Item2,
                    Usuario = new UsuarioLogin
                    {
                        Id = resultIsValideUser.Item2.Id,
                        Login = resultIsValideUser.Item2.Login,
                        Nome = resultIsValideUser.Item2.Nome,
                        Ativo = resultIsValideUser.Item2.Ativo,
                        Perfil_Id = resultIsValideUser.Item2.Perfil_Id
                    }
                    });
                } else {
                    return AuthenticationFailed(resultIsValideUser.Item1);
                }
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }

        private (string, DateTime) CreateToken(Usuario usuario)
        {
             var claims = new[]
            {
                // new Claim(JwtRegisteredClaimNames.UniqueName, usuario.Nome),
                // new Claim(JwtRegisteredClaimNames.UniqueName, usuario.Instituicao), // alterado
                new Claim("infoUsuario", usuario.Id.ToString()),
                new Claim("meuValor", "chavekaeme"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);


            // tempo de expiração do token: 3 hora
            var expiration = DateTime.Now.AddHours(3); 
            
            JwtSecurityToken token = new JwtSecurityToken(
               issuer: null,
               audience: null,
               claims: claims,
               expires: expiration,
               signingCredentials: creds);

               return (new JwtSecurityTokenHandler().WriteToken(token),expiration);

        }     

        private RepositoryResult AuthenticationFailed(string msg)
        {
            return RepositoryResult.AddDapper(new
            {
                authenticated = false,
                errorMessage = msg
            });
        }           

        public async Task<(string, Usuario)> IsValideUser(UsuarioLogin usuarioLogin)
        {
            try
            {
                var senhaCorreta = false;
                var usuario = await _usuarioRepository.GetUsuarioByLogin(usuarioLogin.Login);

                if (usuario != null)
                {
                    if (usuarioLogin.Senha != null)
                    {
                        senhaCorreta = BCrypt.Net.BCrypt.Verify(usuarioLogin.Senha, usuario.Senha);
                    } else {
                        return ("Usuário não possui senha cadastrada.", null);
                    }

                    if (usuario.Ativo == false)
                    {
                        return ("Usuário desativado do sistema.", null);
                    }


                } else {
                    return ("Usuário não encontrado.", null);
                }

                if(senhaCorreta)
                    return ("Ok", usuario);
                else
                    return ("Senha inválida", usuario);
            }
            catch (Exception e)
            {
                throw;
            }
        }


    }
}