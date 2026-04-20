
using Fusion_API.Data;
using Fusion_API.Models;
using Fusion_API.Models.Dto;
using Fusion_API.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Threading.Tasks;

namespace Fusion_API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class OrderHeaderController : Controller
    {
        private readonly ApplicationDbContext _db;
        private readonly ApiResponse _response;

        public OrderHeaderController(ApplicationDbContext db) 
        {
            _db = db;
            _response = new ApiResponse();
        }

        [HttpGet]
        public ActionResult<ApiResponse> GetOrders(string userId="")
        {
            IEnumerable<OrderHeader> orderHeadersList = _db.OrderHeaders
                .Include(x => x.OrderDetails)
                .ThenInclude(x => x.MenuItem)
                .OrderByDescending(x => x.OrderHeaderID);
                
            if(!string.IsNullOrEmpty(userId) )
            {
                orderHeadersList = orderHeadersList.Where(x => x.ApplicationUserId == userId);
            }

            _response.Result = orderHeadersList;
            _response.StatusCode = HttpStatusCode.OK;
            return Ok(_response);
        }

        [HttpGet("{orderId:int}")]
        public ActionResult<ApiResponse> GetOrder(int orderId)
        {
            if (orderId == 0)
            {
                _response.IsSuccess = false;
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.ErrorMessages.Add("Invalid order Id");
                return BadRequest(_response);
            }
            OrderHeader? orderHeader = _db.OrderHeaders
                .Include(x => x.OrderDetails)
                .ThenInclude(x => x.MenuItem)
                .FirstOrDefault(x => x.OrderHeaderID == orderId);
            if (orderHeader == null)
            {
                _response.IsSuccess = false;
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.ErrorMessages.Add("Invalid order Id");
                return NotFound(_response);
            }

         
            _response.Result = orderHeader;
            _response.StatusCode = HttpStatusCode.OK;
            return Ok(_response);
        }

        [HttpPost]
        public ActionResult<ApiResponse> UpdateOrder([FromBody] OrderHeaderCreateDTO orderHeaderDTO)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    OrderHeader orderHeader = new()
                    {
                        PickUpEmail = orderHeaderDTO.PickUpEmail,
                        PickUpPhoneNumber = orderHeaderDTO.PickUpPhoneNumber,
                        PickUpName = orderHeaderDTO.PickUpName,
                        OrderDate = DateTime.Now,
                        OrderTotal = orderHeaderDTO.OrderTotal,
                        Status = SD.status_confirmed,
                        TotalItem = orderHeaderDTO.TotalItem,
                        ApplicationUserId = orderHeaderDTO.ApplicationUserId,
                    };
                    _db.OrderHeaders.Add(orderHeader);
                    _db.SaveChanges();

                    foreach (var orderDetailDTO in orderHeaderDTO.OrderDetailsDTO)
                    {
                        OrderDetail orderDetail = new()
                        {
                            OrderHeaderId = orderHeader.OrderHeaderID,
                            MenuItemId = orderDetailDTO.MenuItemId,
                            Quantity = orderDetailDTO.Quantity,
                            ItemName = orderDetailDTO.ItemName,
                            Price = orderDetailDTO.Price
                        };
                        _db.OrderDetails.Add(orderDetail);
                    }
                    _db.SaveChanges();
                    _response.Result = orderHeader;
                    orderHeader.OrderDetails = [];
                    _response.StatusCode = HttpStatusCode.Created;
                    return CreatedAtAction(nameof(GetOrder), new { orderId = orderHeader.OrderHeaderID}, _response);
                }
                else
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.ErrorMessages= ModelState.Values.SelectMany(u => u.Errors).Select(u => u.ErrorMessage).ToList();
                    return BadRequest(_response);
                }
            }
            catch(Exception ex) 
            {
                _response.IsSuccess = false;
                _response.StatusCode = HttpStatusCode.InternalServerError;
                _response.ErrorMessages.Add(ex.Message);
                return StatusCode((int)HttpStatusCode.InternalServerError, _response);
            }
        }


        [HttpPut("{orderId:int}")]
        public ActionResult<ApiResponse> UpdateOrder(int orderId, [FromBody] OrderHeaderUpdateDTO orderHeaderDTO)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (orderId != orderHeaderDTO.OrderHeaderID)
                    {
                        _response.IsSuccess = false;
                        _response.StatusCode = HttpStatusCode.BadRequest;
                        _response.ErrorMessages.Add("Invalid Id");
                        return BadRequest(_response);
                    }
                    OrderHeader? orderHeaderFromDb = _db.OrderHeaders.FirstOrDefault(x => x.OrderHeaderID == orderId);
                    if(orderHeaderFromDb == null)
                    {
                        _response.IsSuccess = false;
                        _response.StatusCode = HttpStatusCode.NotFound;
                        _response.ErrorMessages.Add("Order not Found");
                        return NotFound(_response);
                    }

                    if (!string.IsNullOrEmpty(orderHeaderDTO.PickUpName))
                    {
                        orderHeaderFromDb.PickUpName = orderHeaderDTO.PickUpName;
                    }
                    if (!string.IsNullOrEmpty(orderHeaderDTO.PickUpPhoneNumber))
                    {
                        orderHeaderFromDb.PickUpPhoneNumber = orderHeaderDTO.PickUpPhoneNumber;
                    }
                    if (!string.IsNullOrEmpty(orderHeaderDTO.PickUpEmail))
                    {
                        orderHeaderFromDb.PickUpEmail = orderHeaderDTO.PickUpEmail;
                    }
                    if (!string.IsNullOrEmpty(orderHeaderDTO.Status))
                    {
                        if (orderHeaderFromDb.Status.Equals(SD.status_confirmed,StringComparison.InvariantCultureIgnoreCase)
                            && orderHeaderDTO.Status.Equals(SD.status_readyForPickUp,StringComparison.InvariantCultureIgnoreCase))
                        {
                            orderHeaderFromDb.Status = SD.status_readyForPickUp;
                        }
                        if (orderHeaderFromDb.Status.Equals(SD.status_readyForPickUp, StringComparison.InvariantCultureIgnoreCase)
                           && orderHeaderDTO.Status.Equals(SD.status_Completed, StringComparison.InvariantCultureIgnoreCase))
                        {
                            orderHeaderFromDb.Status = SD.status_Completed;
                        }
                        if (orderHeaderDTO.Status.Equals(SD.status_Cancelled, StringComparison.InvariantCultureIgnoreCase))
                           
                        {
                            orderHeaderFromDb.Status = SD.status_Cancelled;
                        }
                    }             
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
