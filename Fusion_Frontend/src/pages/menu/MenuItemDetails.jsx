import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetMenuItemByIdQuery } from '../../store/api/menuItemsApi'
import { API_BASE_URL } from '../../utility/constant';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slice/cartSlice';
import { toast } from 'react-toastify';


function MenuItemDetails() {

  const dispatch = useDispatch();
  const { id } = useParams();
  const itemId = parseInt(id);
  const isValidItemId = !isNaN(itemId) && itemId > 0;
  const [quantity, setQuantity] = useState(1);
  const {
    data: selectedMenuItem,
    isLoading,
    error,
    refetch
  } = useGetMenuItemByIdQuery(id);

const  handleAddToCart=()=>{
  dispatch(addToCart({
    id:selectedMenuItem.id,
    name:selectedMenuItem.name,
    price:selectedMenuItem.price,
    image:selectedMenuItem.image,
    quantity:quantity,
  }))
  toast.success(`${selectedMenuItem.name} added to cart`);
}

  if (!isValidItemId) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          <h4>Invalid Menu Item ID</h4>
          <p>
            The menu item ID provided is not valid. Please check the URL and try
            again.
          </p>
          <button className="btn btn-primary">Back to Home</button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading menu item...</p>
      </div>
    )
  }

  if (error || !selectedMenuItem) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          <h4>Error Loading Menu Item</h4>
          <p>
            Menu item not found. It may have been removed or the ID is
            incorrect.
          </p>
          <button className="btn btn-primary">Back to Home</button>
        </div>
      </div>
    )
  }
  return (
    <div className="container py-4">
  {/* Breadcrumb Navigation */}
  <nav aria-label="breadcumb" className="mb-4">
    <ol className="breadcrumb">
      <li className="breadcrumb-item">
        <a href="#" className="text-decoration-none">
          <i className="bi bi-house-door me-1"></i>Home
        </a>
      </li>
      <li className="breadcrumb-item">
        <a href="/" className="text-decoration-none">
          Menu
        </a>
      </li>
      <li className="breadcrumb-item active" aria-current="page">
        {selectedMenuItem.name}
      </li>
    </ol>
  </nav>

  <div className="row g-4">
    {/* Product Image */}
    <div className="col-lg-5">
      <div className="position-relative">
        <div className="rounded-4 overflow-hidden shadow-lg border bg-body position-relative">
          <img
            className="img-fluid"
            src={`${API_BASE_URL}/${selectedMenuItem.image}`}
            style={{
              height: "350px",
              width: "100%",
              objectFit: "cover",
            }}
            onError={(e) => {
              e.target.src = "https://placehold.co/100";
            }}
          />
          {selectedMenuItem.specialTag && (
            <div className="position-absolute top-0 start-0 m-2">
              <span className="badge bg-danger px-2 py-1 rounded-pill shadow-sm">
                {selectedMenuItem.specialTag}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Product Details */}
    <div className="col-lg-7">
      <div className="h-100 d-flex flex-column">
        {/* Header Section */}
        <div className="mb-3">
          <div className="d-flex align-items-start justify-content-between mb-2">
            <div>
              <h1 className="fs-4 fw-bold mb-1">
                {selectedMenuItem.name}
              </h1>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle px-2 py-1">
                  {selectedMenuItem.category}
                </span>
                <span className="text-success small fw-semibold">
                  <i className="bi bi-check-circle-fill me-1"></i>
                  Available
                </span>
              </div>
            </div>
            <div className="text-end">
              <div className="h4 text-primary fw-bold mb-0">
                ₹{selectedMenuItem.price.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-3">
          <h6 className="fw-semibold mb-2 text-muted text-uppercase">
            Description
          </h6>
          <p className="text-muted mb-0" style={{ lineHeight: "1.5" }}>
            {selectedMenuItem.description}
          </p>
        </div>

        {/* Add to Cart Section */}
        <div className="mt-auto">
          <div className="card border-0">
            <div className="card-body p-3">
              <div className="row g-3 align-items-end">
                <div className="col-sm-5">
                  <label className="form-label fw-semibold text-muted small text-uppercase mb-2">
                    Quantity
                  </label>
                  <div className="input-group input-group-sm">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <input
                      type="number"
                      className="form-control text-center fw-semibold"
                      min="1"
                      max="10"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(
                          Math.max(1, Math.min(10, parseInt(e.target.value) || 1))
                        )
                      }
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      disabled={quantity >= 10}
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </div>
                <div className="col-sm-7">
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-primary fw-semibold shadow-sm"
                      onClick={handleAddToCart}
                    >
                      <i className="bi bi-cart-plus me-2"></i>
                      Add to Cart
                    </button>

                    <button
                      className="btn btn-outline-primary btn-sm"
                      // onClick={() => navigate(ROUTES.HOME)}
                    >
                      <i className="bi bi-arrow-left me-2"></i>
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>

              {/* Total Price Display */}
              <div className="mt-2 p-2 rounded border">
                <div className="row">
                  <div className="col-6">
                    <small className="text-muted">
                      Subtotal ({quantity} item{quantity == 1 ? "" : "s"})
                    </small>
                  </div>
                  <div className="col-6 text-end">
                    <span className="fw-bold text-primary h6 mb-0">
                      ₹{(selectedMenuItem.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="row g-2 mt-2">
            <div className="col-md-6">
              <div className="card border-0 bg-success-subtle">
                <div className="card-body p-2 text-center">
                  <i
                    className="bi bi-clock text-success mb-1 d-block"
                    style={{ fontSize: "1.2rem" }}
                  ></i>
                  <small className="fw-semibold text-success">
                    Ready in 15-20 mins
                  </small>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border-0 bg-info-subtle">
                <div className="card-body p-2 text-center">
                  <i
                    className="bi bi-geo-alt text-info mb-1 d-block"
                    style={{ fontSize: "1.2rem" }}
                  ></i>
                  <small className="fw-semibold text-info">
                    Free Pickup
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Product Information Card */}
  <div className="row mt-4">
    <div className="col">
      <div className="card border shadow-sm">
        <div className="card-header bg-primary-subtle py-2">
          <h6 className="fw-bold mb-0 text-primary">
            <i className="bi bi-info-circle me-2"></i>
            Product Information
          </h6>
        </div>
        <div className="card-body py-3">
          <div className="row g-3 text-center">
            <div className="col-lg-3 col-md-6">
              <div className="border-end border-light-subtle pe-3">
                <i
                  className="bi bi-tag text-secondary mb-1 d-block"
                  style={{ fontSize: "1.2rem" }}
                ></i>
                <div className="text-muted text-uppercase fw-semibold small mb-1">
                  Category
                </div>
                <div className="fw-semibold small">
                  {selectedMenuItem.category}
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="border-end border-light-subtle pe-3">
                <i
                  className="bi bi-star text-warning mb-1 d-block"
                  style={{ fontSize: "1.2rem" }}
                ></i>
                <div className="text-muted text-uppercase fw-semibold small mb-1">
                  Special Tag
                </div>
                <div className="fw-semibold small">
                  {selectedMenuItem.specialTag}
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="border-end border-light-subtle pe-3">
                <i
                  className="bi bi-currency-dollar text-success mb-1 d-block"
                  style={{ fontSize: "1.2rem" }}
                ></i>
                <div className="text-muted text-uppercase fw-semibold small mb-1">
                  Price
                </div>
                <div className="text-primary fw-bold small">
                  ₹{selectedMenuItem.price.toFixed(2)}
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <i
                className="bi bi-check-circle text-success mb-1 d-block"
                style={{ fontSize: "1.2rem" }}
              ></i>
              <div className="text-muted text-uppercase fw-semibold small mb-1">
                Availability
              </div>
              <div className="text-success fw-semibold small">In Stock</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )


}

export default MenuItemDetails