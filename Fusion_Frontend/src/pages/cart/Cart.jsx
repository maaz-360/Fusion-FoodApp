import { useState } from 'react'
import { API_BASE_URL, ROUTES } from '../../utility/constant'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, updateQuantity, clearCart } from '../../store/slice/cartSlice'
// import { toast } from 'react-toastify'
import toast from "react-hot-toast";
import { useCreateOrderMutation } from '../../store/api/ordersApi'


function Cart() {



  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const { totalItems, items, totalAmount } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.auth)
  const theme = useSelector((state) => state.theme.mode);

  const getThemeStyles = () => {
    if (theme === "dark") {
      return { background: `radial-gradient(ellipse at 30% 80%, #003322 0%, #000d0a 50%, #000000 100%)` };
    }
    return { background: `linear-gradient(135deg, #a8edea 0%, #fed6e3 25%, #d299c2 50%, #fef9d7 75%, #a8edea 100%)` };
  };

  const [formData, setFormData] = useState({
    pickUpName: user?.name || "",
    pickUpEmail: user?.email || "",
    pickUpPhoneNumber: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];
    if (!formData.pickUpName.trim()) errors.push("Pickup name is required");
    if (!formData.pickUpEmail.trim()) errors.push("Pickup email is required");
    if (!formData.pickUpPhoneNumber.trim()) errors.push("Pickup phone number is required");

    if (errors.length > 0) {
      toast.error(
        <div>
          <strong>Please correct the following:</strong>
          <ul className="mb-0 mt-1 ps-3">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      );
      return;
    }

    if (!user?.id) {
      toast.error("Unable to identify user. Please log in again.");
      return;
    }


    const orderData = {
      pickUpName: formData.pickUpName,
      pickUpPhoneNumber: formData.pickUpPhoneNumber,
      pickUpEmail: formData.pickUpEmail,
      applicationUserId: user?.id,
      orderTotal: totalAmount,
      totalItem: totalItems,
      orderDetailsDTO: items.map((item) => (
        {
          menuItemId: item.id,
          quantity: item.quantity,
          itemName: item.name,
          price: item.price
        }
      ))
    };
    try {
      const result = await createOrder(orderData).unwrap();
      if (result.isSuccess) {
        toast.success("Order placed successfully!");
        console.log(result)
        navigate(ROUTES.ORDER_CONFIRMATION, {
          state: {
            orderData: {
              orderHeaderID: result.result.orderHeaderID,
              pickUpName: formData.pickUpName,
              pickUpEmail: formData.pickUpEmail,
              pickUpPhoneNumber: formData.pickUpPhoneNumber,
              orderTotal: totalAmount,
              totalItems: totalItems,


            }
          }
        });
        dispatch(clearCart())
      } else {
        toast.error(result.errorMessages?.[0] || "Failed to place order");
      }
    } catch (error) {
      toast.error(error.data?.errorMessages?.[0] || "Failed to place order");
    }
  };





  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      handleRemoveItem(id);
      return;
    }
    else {
      dispatch(updateQuantity({ id, quantity }))
    }
  }

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart({ id }))
    toast.success("Item removed from cart")
  }

  const handleClearCart = () => {
    dispatch(clearCart())
    toast.success("Cart cleared")
  }

  if (items.length === 0) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          background: "var(--bs-body-bg)",
          ...getThemeStyles(),  // ✅ reacts to theme
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "420px", width: "100%" }}>

          <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "2rem" }}>
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "var(--bs-tertiary-bg)",   // ✅
                border: "2px dashed var(--bs-primary)", // ✅
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i className="bi bi-cart-x" style={{ fontSize: "2.4rem", color: "var(--bs-primary)" }} />
            </div>
          </div>

          <h2
            style={{
              fontWeight: "700",
              fontSize: "1.7rem",
              color: "var(--bs-body-color)",  // ✅
              marginBottom: "0.5rem",
            }}
          >
            Your cart is empty
          </h2>

          <p style={{ color: "var(--bs-secondary-color)", fontSize: "1rem", marginBottom: "2rem" }}>
            Looks like you haven't added anything yet. <br />
            Let's find something delicious!
          </p>

          <p style={{ marginTop: "1.25rem", color: "var(--bs-secondary-color)", fontSize: "0.85rem" }}>
            Free delivery on your first order 🎁
          </p>
          <Link
            to={ROUTES.HOME}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              color: "#fff",
              fontWeight: "600",
              fontSize: "1rem",
              padding: "13px 32px",
              borderRadius: "50px",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(99,102,241,0.35)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <i className="bi bi-shop" style={{ fontSize: "1.1rem" }} />
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid p-3" style={{ minHeight: "100vh", ...getThemeStyles() }}>

        <div className="row g-4 pt-2">
          {/* Left Column - Cart Management */}
          <div className="col-lg-8">
            <div className="card rounded shadow-sm d-flex flex-column" style={{ maxHeight: "85vh" }}>

              {/* Cart Header */}
              <div className="p-3 border-bottom flex-shrink-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="fw-bold mb-0">
                    <i className="bi bi-cart3 me-2"></i>
                    Your Shopping Cart
                  </h5>
                  <div className="text-muted small">
                    <i className="bi bi-info-circle me-1"></i>
                    Review and modify your order
                  </div>
                </div>
              </div>

              {/* Cart Items - only this scrolls */}
              <div
                className="p-3 flex-grow-1"
                style={{ overflowY: "auto", minHeight: 0 }}
              >
                <div className="row g-2">
                  {items.map((item) => (
                    <div className="col-12" key={item.id}>
                      <div className="border rounded p-2 border-light hover-shadow">
                        <div className="d-flex align-items-center gap-3">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <img
                              src={`${API_BASE_URL}/${item.image}`}
                              className="rounded"
                              style={{
                                width: 75,
                                height: 75,
                                objectFit: "cover",
                              }}
                              onError={(e) => {
                                e.target.src = "https://placehold.co/75";
                              }}
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-grow-1">
                            <div className="row align-items-center">
                              <div className="col-md-4">
                                <h6 className="mb-1 fw-semibold">
                                  {item.name}
                                </h6>
                                <div className="text-muted small">
                                  ₹{parseFloat(item.price).toFixed(2)} each
                                </div>
                              </div>

                              <div className="col-md-3">
                                <label className="form-label small text-muted mb-1">
                                  Quantity
                                </label>
                                <div className="input-group input-group-sm">
                                  <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() =>
                                      handleQuantityChange(item.id, item.quantity - 1)
                                    }
                                  >
                                    <i className="bi bi-dash"></i>
                                  </button>
                                  <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) =>
                                      handleQuantityChange(item.id, e.target.value)
                                    }
                                    className="form-control text-center"
                                    min="1"
                                  />
                                  <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() =>
                                      handleQuantityChange(item.id, item.quantity + 1)
                                    }
                                  >
                                    <i className="bi bi-plus"></i>
                                  </button>
                                </div>
                              </div>

                              <div className="col-md-3">
                                <label className="form-label small text-muted mb-1">
                                  Subtotal
                                </label>
                                <div className="fw-bold text-primary fs-6">
                                  ₹{(item.price * item.quantity).toFixed(2)}
                                </div>
                              </div>

                              <div className="col-md-2">
                                <button
                                  className="btn btn-outline-danger btn-sm w-100"
                                  title="Remove item"
                                  onClick={() => handleRemoveItem(item.id)}
                                >
                                  <i className="bi bi-trash3"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Total - always visible */}
              <div className="px-3 py-2 border-top border-bottom flex-shrink-0">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold h6 mb-0">
                    <i className="bi bi-calculator me-2"></i>
                    Cart Total ({totalItems} items)
                  </span>
                  <span className="fw-bold text-primary h5 mb-0">
                    ₹{totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons - always visible */}
              <div className="border-top px-3 py-2 flex-shrink-0">
                <div className="d-flex gap-3 justify-content-center">
                  <Link
                    to={ROUTES.HOME}
                    className="btn btn-outline-secondary btn-sm px-4 rounded-pill"
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Continue Shopping
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm px-4 rounded-pill"
                    onClick={handleClearCart}
                  >
                    <i className="bi bi-trash3 me-2"></i>
                    Clear Cart
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column - Checkout Panel */}
          <div className="col-lg-4">
            <div style={{ top: "20px" }}>
              <form onSubmit={handleSubmit}>
                <div className="card rounded shadow-sm">
                  <div className="p-4">
                    {/* Pickup Information */}
                    <div className="mb-4">
                      <h5 className="fw-bold mb-3">
                        <i className="bi bi-person-check me-2"></i>
                        Pickup Details
                      </h5>
                      <div className="row g-3">
                        <div className="col-12">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="pickUpName"
                              name="pickUpName"
                              placeholder="Full Name"
                              value={formData.pickUpName}
                              onChange={handleChange}
                            />
                            <label htmlFor="pickUpName">Full Name *</label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating">
                            <input
                              type="tel"
                              className="form-control"
                              id="pickUpPhoneNumber"
                              name="pickUpPhoneNumber"
                              placeholder="Phone Number"
                              value={formData.pickUpPhoneNumber}
                              onChange={handleChange}
                            />
                            <label htmlFor="pickUpPhoneNumber">
                              Phone Number *
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating">
                            <input
                              type="email"
                              className="form-control"
                              id="pickUpEmail"
                              name="pickUpEmail"
                              placeholder="Email"
                              value={formData.pickUpEmail}
                              onChange={handleChange}
                            />
                            <label htmlFor="pickUpEmail">Email Address *</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Place Order Button */}
                    <div className="d-grid">
                      <button
                        className="btn btn-primary btn-lg"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Processing...</>
                        ) : (
                          <>
                            <i className="bi bi-credit-card me-2"></i>
                            Place Order (₹{totalAmount.toFixed(2)})
                          </>
                        )}



                      </button>
                    </div>
                  </div>

                  {/* Pickup Info */}
                  <div className="border-top p-4">
                    <div className="alert alert-info small mb-0">
                      <i className="bi bi-clock me-2"></i>
                      <strong>Ready in 15-20 mins</strong> after order confirmation
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}



export default Cart;