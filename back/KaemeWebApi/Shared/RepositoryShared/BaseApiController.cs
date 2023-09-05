using Microsoft.AspNetCore.Mvc;
using Shared.RepositoryShared;


namespace WebAPIShared.Controllers
{
    [JwtBearerAuthorize]
    public abstract class BaseApiController : ControllerBase
    {
        public IActionResult GetActionResult(RepositoryResult repositoryActionResult)            
        {
            switch (repositoryActionResult.Status)
            {
                case ERepositoryResultStatus.Created:
                    return Created(Request.Method, repositoryActionResult.Dapper);

                case ERepositoryResultStatus.NotFound:
                    return NotFound();

                case ERepositoryResultStatus.Deleted:
                    return NoContent();

                case ERepositoryResultStatus.Ok:
                    return Ok(repositoryActionResult.Dapper);

                case ERepositoryResultStatus.Updated:
                    return Ok(repositoryActionResult.Dapper);

                case ERepositoryResultStatus.InternalError:
                    return StatusCode(500);

                default:
                    return BadRequest();
            }
        }
    }

    internal class JwtBearerAuthorizeAttribute : Attribute
    {
    }
}