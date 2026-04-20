import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utility/constant";

function MyOrderModel({ onClose }) {
  const navigate = useNavigate();

  return (
   <div className="custom-modal-overlay" onClick={onClose}>
  <div
    className="custom-modal-modern"
    onClick={(e) => e.stopPropagation()} // prevent closing on inside click
  >
    
    {/* Icon */}
    <div className="modal-icon mb-3">
      <i className="bi bi-lock-fill"></i>
    </div>

    {/* Title */}
    <h5 className="fw-semibold mb-1">Login Required</h5>

    {/* Subtitle */}
    <p className="text-muted small mb-3">
      Please login to view your orders
    </p>

    {/* Buttons */}
    <div className="d-flex flex-column gap-2">
      <button
        className="btn btn-orange rounded-pill"
        onClick={() => {
         onClose();
navigate(ROUTES.LOGIN);
        }}
      >
        Login
      </button>

      <button
        className="btn btn-light border rounded-pill"
        onClick={onClose}
      >
        Cancel
      </button>
    </div>
  </div>
</div>
  );
}

export default MyOrderModel;