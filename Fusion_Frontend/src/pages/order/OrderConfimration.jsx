import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utility/constant";

function OrderConfimration() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  if (!orderData) return null

  return (
    <div className="container py-3">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7">

          {/* Success Section */}
          <div className="text-center mb-3">
            <div
              className="d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 rounded-circle mb-2"
              style={{ width: "70px", height: "70px" }}
            >
              <i className="bi bi-check-lg text-success" style={{ fontSize: "1.8rem" }}></i>
            </div>

            <h2 className="fw-bold  mb-1">Order Confirmed 🎉</h2>
            <p className="text-muted mb-0">Your order has been placed successfully.</p>
          </div>

          {/* Card */}
          <div className="card border-0 shadow-lg rounded-4">
            <div className="card-body p-3">

              {/* Order ID Highlight */}
              <div className="text-center mb-3">
                <p className="text-muted mb-1">Order ID</p>
                <h4 className="fw-bold text-primary">ORD-{new Date().getFullYear().toString().slice(2)}-{orderData.orderHeaderID.toString().padStart(4, "0")}</h4>
              </div>

              <hr className="my-2" />

              {/* Order Details */}
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted d-flex align-items-center gap-2">
                  <i className="bi bi-person-lines-fill"></i>
                  Name
                </span>
                <span className="fw-semibold">
                  {orderData.pickUpName}
                </span>
              </div>



              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted d-flex align-items-center gap-2">
                  <i class="bi bi-envelope"></i>
                  Email
                </span>
                <span className="fw-semibold">
                  {orderData.pickUpEmail}
                </span>
              </div>


              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted d-flex align-items-center gap-2">
                  <i class="bi bi-phone"></i>
                  Phone
                </span>
                <span className="fw-semibold">
                  {orderData.pickUpPhoneNumber}
                </span>
              </div>



              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted d-flex align-items-center gap-2">
                  <i class="bi bi-basket"></i>
                  Items
                </span>
                <span className="fw-semibold">
                  {orderData.totalItems}
                </span>
              </div>



              <hr className="my-2" />

              {/* Total */}
              <div className="d-flex justify-content-between mb-3">
                <span className="fw-bold">Total</span>
                <span className="fw-bold text-success fs-5">₹{orderData.orderTotal.toFixed(2)}</span>
              </div>

              {/* Button */}
              <button
                className="btn w-100 text-white fw-semibold"
                style={{
                  background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
                  border: "none",
                  padding: "10px",          // 12px → 10px
                  borderRadius: "10px",
                }}
                onClick={() => navigate(ROUTES.HOME)}
              >
                Continue Shopping
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default OrderConfimration;
