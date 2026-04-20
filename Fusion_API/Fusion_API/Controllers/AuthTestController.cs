using Fusion_API.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Fusion_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthTestController : Controller
    {
        [HttpGet]
        [Authorize]
        public ActionResult<string> GetSomething()
        {
            return "You are authorized user";
        }

        [HttpGet("{id}")]
        [Authorize(Roles =SD.Role_Admin)]
        public ActionResult<string> GetSomething(int id)
        {
            return "You are authorized user with Role of Admin";
        }
    }
}
