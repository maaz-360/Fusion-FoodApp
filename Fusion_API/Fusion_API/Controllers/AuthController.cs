using Fusion_API.Models;
using Fusion_API.Models.Dto;
using Fusion_API.Utility;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Fusion_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly ApiResponse _response;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly string secretKey;

        public AuthController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            secretKey = configuration.GetValue<string>("Jwt:Secret")??"";
            _response = new ApiResponse();
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDTO model)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser newUser = new()
                {
                    Email = model.Email,
                    UserName =model.Email,
                    Name = model.Name,
                    NormalizedEmail = model.Email.ToUpper()
                };

                var result = await _userManager.CreateAsync(newUser, model.Password);
                if (result.Succeeded)
                {
                    if (!_roleManager.RoleExistsAsync(SD.Role_Admin).GetAwaiter().GetResult())
                    {
                        await _roleManager.CreateAsync(new IdentityRole(SD.Role_Admin));
                        await _roleManager.CreateAsync(new IdentityRole(SD.Role_Customer));
                    }
                    if(model.Role.Equals(SD.Role_Admin, StringComparison.CurrentCultureIgnoreCase))
                    {
                        await _userManager.AddToRoleAsync(newUser, SD.Role_Admin);
                    }
                    else
                    {
                        await _userManager.AddToRoleAsync(newUser, SD.Role_Customer);
                    }

                    _response.StatusCode = HttpStatusCode.OK;
                    _response.IsSuccess = true;
                    return Ok(_response);
                }
                else
                {
                    foreach (var error in result.Errors)
                    {                       
                            _response.ErrorMessages.Add(error.Description);                       
                    }
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    return BadRequest(_response);
                }
            }
            else
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                foreach (var error in ModelState.Values)
                {
                    foreach (var item in error.Errors)
                    {
                        _response.ErrorMessages.Add(item.ErrorMessage);
                    }
                }
                return BadRequest(_response); 
            }
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO model)
        {
            if (ModelState.IsValid)
            {        
                var userFromDb = await _userManager.FindByEmailAsync(model.Email);
                if(userFromDb != null)
                {
                    bool isValid = await _userManager.CheckPasswordAsync(userFromDb, model.Password);
                    if (!isValid)
                    {
                        _response.Result = new LoginResponseDTO();
                        _response.StatusCode = HttpStatusCode.BadRequest;
                        _response.IsSuccess = false;
                        _response.ErrorMessages.Add("Invalid Credentials");
                        return BadRequest(_response);
                    }
                    //JWT Starts
                    var roles = await _userManager.GetRolesAsync(userFromDb);
                    var claims = new[]
                    {
                       new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                       new Claim("fullname",userFromDb.Name),
                       new Claim("id",userFromDb.Id),
                       new Claim(ClaimTypes.Email,userFromDb.Email!.ToString()),
                       new Claim(ClaimTypes.Role, roles.FirstOrDefault() ?? "")
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var token = new JwtSecurityToken(
                        claims:claims,
                        expires:DateTime.UtcNow.AddDays(7),
                        signingCredentials:creds
                        );

                    var jwt = new JwtSecurityTokenHandler().WriteToken(token);

                    LoginResponseDTO loginResponse = new()
                    {
                        Email = userFromDb.Email,
                        Token = jwt,
                        Role = roles.FirstOrDefault()!
                    };
                    _response.Result = loginResponse;
                    _response.StatusCode = HttpStatusCode.OK;
                    _response.IsSuccess = true;
                    return Ok(_response);


                    //JwtSecurityTokenHandler tokenHandler = new();
                    //byte[] key = Encoding.ASCII.GetBytes(secretKey);

                    //SecurityTokenDescriptor tokenDescriptor = new()
                    //{
                    //    Subject = new ClaimsIdentity([
                    //        new("fullname",userFromDb.Name),
                    //        new("id",userFromDb.Id),
                    //        new(ClaimTypes.Email,userFromDb.Email!.ToString()),
                    //        new(ClaimTypes.Role, _userManager.GetRolesAsync(userFromDb).Result.FirstOrDefault()!)
                    //        ]),
                    //    Expires = DateTime.UtcNow.AddDays(7),
                    //    SigningCredentials = new(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                    //};

                    //SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

                    //LoginResponseDTO loginResponse = new()
                    //{
                    //    Email = userFromDb.Email,
                    //    Token = tokenHandler.WriteToken(token),
                    //    Role = _userManager.GetRolesAsync(userFromDb).Result.FirstOrDefault()!
                    //};

                    //_response.Result = loginResponse;
                    //_response.StatusCode = HttpStatusCode.OK;
                    //_response.IsSuccess = true;
                    //return Ok(_response);


                }
                _response.Result = new LoginResponseDTO();
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Invalid Credentials");
                return BadRequest(_response);
            }
            else
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                foreach (var error in ModelState.Values)
                {
                    foreach (var item in error.Errors)
                    {
                        _response.ErrorMessages.Add(item.ErrorMessage);
                    }
                }
                return BadRequest(_response);
            }
        }
    }
}
