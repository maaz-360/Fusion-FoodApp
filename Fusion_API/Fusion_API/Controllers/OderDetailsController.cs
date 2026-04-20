using Fusion_API.Data;
using Fusion_API.Models;
using Fusion_API.Models.Dto;
using Fusion_API.Utility;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Fusion_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OderDetailsController : Controller
    {
        private readonly ApplicationDbContext _db;
        private readonly ApiResponse _response;

        public OderDetailsController(ApplicationDbContext db) 
        {
            _db = db;
            _response = new ApiResponse();
        }
        [HttpPut("{orderDetailsId:int}")]
        public ActionResult<ApiResponse> UpdateOrder(int orderDetailsId, [FromBody] OrderDetailsUpdateDTO orderDetailsDTO)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (orderDetailsId != orderDetailsDTO.OrderDetailId)
                    {
                        _response.IsSuccess = false;
                        _response.StatusCode = HttpStatusCode.BadRequest;
                        _response.ErrorMessages.Add("Invalid Id");
                        return BadRequest(_response);
                    }
                    OrderDetail? orderDetailFromDb = _db.OrderDetails.FirstOrDefault(x => x.OrderDetailId == orderDetailsId);
                    if (orderDetailFromDb == null)
                    {
                        _response.IsSuccess = false;
                        _response.StatusCode = HttpStatusCode.NotFound;
                        _response.ErrorMessages.Add("Order not Found");
                        return NotFound(_response);
                    }

                    orderDetailFromDb.Rating = orderDetailsDTO.Rating;
                    _db.SaveChanges();
                    _response.StatusCode = HttpStatusCode.NoContent;
                    return Ok(_response);
                }
                else
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.ErrorMessages = ModelState.Values.SelectMany(u => u.Errors).Select(u => u.ErrorMessage).ToList();
                    return BadRequest(_response);
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.StatusCode = HttpStatusCode.InternalServerError;
                _response.ErrorMessages.Add(ex.Message);
                return StatusCode((int)HttpStatusCode.InternalServerError, _response);
            }
        }
    }
}
