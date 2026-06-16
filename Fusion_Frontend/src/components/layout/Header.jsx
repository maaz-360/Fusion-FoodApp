import { ROUTES, ROLES,  } from '../../utility/constant'
import { useState,  } from "react"
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slice/authSlice';
import { toggleTheme } from '../../store/slice/themeSlice';
import "./Header.css"
import MyOrderModel from '../orders/MyOrderModel';
import LoginRequiredModal from '../ui/LoginRequiredModal';





function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);
const theme = useSelector((state) => state.theme.mode);

  const [animate, setAnimate] = useState(false);
  // const [showOrderModel, setShowOrderModel] = useState(false)
const [activeModal, setActiveModal] = useState(null);

  
//Backround change
  const getThemeStyles = () => {
    if (theme === "dark") {
      return {   background: `radial-gradient(ellipse at 30% 80%, #003322 0%, #000d0a 50%, #000000 100%)` };
    }
    return { background: `linear-gradient(135deg, #a8edea 0%, #fed6e3 25%, #d299c2 50%, #fef9d7 75%, #a8edea 100%)` };
  };

  // LoginRequried
  const handleMyOrdersClick = () => {
    if (!isAuthenticated) {
      setActiveModal("orders");
    } else {
      navigate(ROUTES.ORDER_MANAGEMENT);
    }
  }
  const handleCartClick = () => {
    
      navigate(ROUTES.CART);
  
  }
  const handlecloseModal = () => {
    setActiveModal(null)
  }

  //Toggle theme
  const handleThemeToggle = () => {
    setAnimate(true);
    dispatch(toggleTheme());

    setTimeout(() => setAnimate(false), 400);
  };


  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.HOME);
  };

  const themeIcon = theme === "dark" ? "bi-moon-stars-fill" : "bi-sun-fill";

 

 
  return (


    // <nav className="sticky-top navbar navbar-expand-lg border-bottom shadow-sm"
    //   style={getThemeStyles()}>
    //   <div className="container py-2">

    //     {/* ── Brand ── */}
    //     <NavLink to={ROUTES.HOME} className="navbar-brand d-flex align-items-center gap-2">
    //       <i className="bi bi-fire text-primary fs-4"></i>
    //       <span className="fw-bold">Fusion Hub</span>
    //     </NavLink>

    //     {/* ── Mobile: right-side controls ── */}
    //     <div className="d-flex align-items-center gap-2 d-lg-none ms-auto">

    //       {/* Cart — mobile */}
    //       <div>
    //         <button onClick={handleCartClick} className="hdr-icon-btn hdr-icon-btn-sm position-relative d-flex align-items-center justify-content-center text-decoration-none">
    //           <i className="bi bi-bag fs-5"></i>
    //           {totalItems > 0 && (
    //             <span className="hdr-cart-badge hdr-cart-badge-sm position-absolute d-flex align-items-center justify-content-center">
    //               {totalItems}
    //             </span>
    //           )}
    //         </button>
    //         {activeModal ==="cart" && (<LoginRequiredModal onClose={handlecloseModal} />)}
    //       </div>
    //       {/* Theme toggle — mobile */}
    //       <div
    //         className="hdr-icon-btn hdr-icon-btn-sm d-flex align-items-center justify-content-center"
    //         role="button"
    //         onClick={handleThemeToggle}
    //         style={{ cursor: "pointer" }}
    //       >
    //         <i className={`bi ${themeIcon} fs-6 theme-icon ${animate ? "rotate" : ""}`}></i>
    //       </div>

    //       {/* Hamburger */}
    //       <button
    //         className="navbar-toggler border-0"
    //         type="button"
    //         data-bs-toggle="collapse"
    //         data-bs-target="#mainNav"
    //         aria-controls="mainNav"
    //         aria-expanded="false"
    //         aria-label="Toggle navigation"
    //       >
    //         <span className="navbar-toggler-icon"></span>
    //       </button>
    //     </div>

    //     {/* ── Collapsible nav ── */}
    //     <div className="collapse navbar-collapse" id="mainNav">
    //       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //         <li className="nav-item">
    //           <button onClick={handleMyOrdersClick} className="nav-link">
    //             My Orders
    //           </button>
    //           {activeModal === "orders" && (<MyOrderModel onClose={handlecloseModal} />)}
    //         </li>
    //       </ul>



    //       <ul className="navbar-nav ms-auto align-items-lg-center gap-2">

    //         {/* Cart — desktop */}
    //         <li className="nav-item d-none d-lg-flex align-items-center">
    //           <button onClick={handleCartClick} className="hdr-icon-btn position-relative d-flex align-items-center justify-content-center text-decoration-none">
    //             <i className="bi bi-bag fs-5"></i>
    //             {totalItems > 0 && (
    //               <span className="hdr-cart-badge position-absolute d-flex align-items-center justify-content-center">
    //                 {totalItems}
                    
    //               </span>

    //             )}

    //           </button>
    //            {activeModal ==="cart" && (<LoginRequiredModal onClose={handlecloseModal} />)}
              
    //         </li>

    //         {/* ── Auth section ── */}
    //         {isAuthenticated ? (
    //           <li className="nav-item dropdown">
    //             <button
    //               className="hdr-user-btn d-flex align-items-center gap-2 border-0 w-100"
    //               data-bs-toggle="dropdown"
    //               aria-expanded="false"
    //             >
    //               <div className="hdr-avatar d-flex align-items-center justify-content-center">
    //                 {user?.name?.charAt(0)?.toUpperCase() || "U"}
    //               </div>
    //               <span className="hdr-user-name text-truncate">
    //                 {user?.name?.split(" ")?.[0] || "User"}
    //               </span>
    //               <i className="bi bi-chevron-down small text-muted ms-auto"></i>
    //             </button>

    //             <ul className="hdr-dropdown dropdown-menu dropdown-menu-end shadow border rounded-3 p-2 small">
    //               {user?.role === ROLES.ADMIN && (
    //                 <>
    //                   <li>
    //                     <NavLink to={ROUTES.ORDER_MANAGEMENT} className="dropdown-item d-flex align-items-center gap-2 rounded-2">
    //                       <i className="bi bi-speedometer2 text-primary"></i>
    //                       <span>Order Management</span>
    //                     </NavLink>
    //                   </li>
    //                   <li>
    //                     <NavLink to={ROUTES.MENU_MANAGEMENT} className="dropdown-item d-flex align-items-center gap-2 rounded-2">
    //                       <i className="bi bi-list-ul text-primary"></i>
    //                       <span>Menu Management</span>
    //                     </NavLink>
    //                   </li>
    //                   <li><hr className="dropdown-divider my-2" /></li>
    //                 </>
    //               )}
    //               <li>
    //                 <button onClick={handleLogout} className="dropdown-item d-flex align-items-center gap-2 text-danger rounded-2">
    //                   <i className="bi bi-box-arrow-right"></i>
    //                   <span>Logout</span>
    //                 </button>
    //               </li>
    //             </ul>
    //           </li>
    //         ) : (
    //           <>
    //             <li className="nav-item">
    //               <NavLink to={ROUTES.LOGIN} className="hdr-register-link d-flex align-items-center px-3">
    //                 <i className="bi bi-person me-2 fs-6"></i>
    //                 Login
    //               </NavLink>
    //             </li>
    //             <li className="nav-item">
    //               <NavLink to={ROUTES.REGISTER} className="hdr-register-link d-flex align-items-center px-3">
    //                 <i className="bi bi-stars me-2 fs-6"></i>
    //                 Register
    //               </NavLink>
    //             </li>
    //           </>
    //         )}

    //         {/* Theme toggle — desktop */}
    //         <li className="nav-item d-none d-lg-flex align-items-center ms-2">
    //           <div
    //             className="hdr-icon-btn position-relative d-flex align-items-center justify-content-center text-decoration-none"
    //             role="button"
    //             onClick={() => dispatch(toggleTheme())}
    //             style={{ cursor: "pointer" }}
    //           >
    //             <i className={`bi ${themeIcon} fs-5`}></i>
    //           </div>
    //         </li>

    //       </ul>
    //     </div>
    //   </div>
    // </nav>

<nav className="sticky-top navbar navbar-expand-lg border-bottom shadow-sm"
      style={getThemeStyles()}>
      <div className="container py-2">

        {/* ── Brand ── */}
        <NavLink to={ROUTES.HOME} className="navbar-brand d-flex align-items-center gap-2">
          <i className="bi bi-fire text-primary fs-4"></i>
          <span className="fw-bold">Fusion Hub</span>
        </NavLink>

        {/* ── Mobile: right-side controls ── */}
        <div className="d-flex align-items-center gap-2 d-lg-none ms-auto">

          {/* Cart — mobile */}
          <div>
            <button onClick={handleCartClick} className="hdr-icon-btn hdr-icon-btn-sm position-relative d-flex align-items-center justify-content-center text-decoration-none">
              <i className="bi bi-bag fs-5"></i>
              {totalItems > 0 && (
                <span className="hdr-cart-badge hdr-cart-badge-sm position-absolute d-flex align-items-center justify-content-center">
                  {totalItems}
                </span>
              )}
            </button>
            {activeModal ==="cart" && (<LoginRequiredModal onClose={handlecloseModal} />)}
          </div>
          {/* Theme toggle — mobile */}
          <div
            className="hdr-icon-btn hdr-icon-btn-sm d-flex align-items-center justify-content-center"
            role="button"
            onClick={handleThemeToggle}
            style={{ cursor: "pointer" }}
          >
            <i className={`bi ${themeIcon} fs-6 theme-icon ${animate ? "rotate" : ""}`}></i>
          </div>

          {/* Hamburger */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* ── Collapsible nav ── */}
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button onClick={handleMyOrdersClick} className="nav-link">
                My Orders
              </button>
              {activeModal === "orders" && (<MyOrderModel onClose={handlecloseModal} />)}
            </li>
          </ul>



          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">

            {/* Cart — desktop */}
            <li className="nav-item d-none d-lg-flex align-items-center">
              <button onClick={handleCartClick} className="hdr-icon-btn position-relative d-flex align-items-center justify-content-center text-decoration-none">
                <i className="bi bi-bag fs-5"></i>
                {totalItems > 0 && (
                  <span className="hdr-cart-badge position-absolute d-flex align-items-center justify-content-center">
                    {totalItems}
                    
                  </span>

                )}

              </button>
               {activeModal ==="cart" && (<LoginRequiredModal onClose={handlecloseModal} />)}
              
            </li>

            {/* ── Auth section ── */}
            {isAuthenticated ? (
              <li className="nav-item dropdown">
                <button
                  className="hdr-user-btn d-flex align-items-center gap-2 border-0 w-100"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="hdr-avatar d-flex align-items-center justify-content-center">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span className="hdr-user-name text-truncate">
                    {user?.name?.split(" ")?.[0] || "User"}
                  </span>
                  <i className="bi bi-chevron-down small text-muted ms-auto"></i>
                </button>

                <ul className="hdr-dropdown dropdown-menu dropdown-menu-end shadow border rounded-3 p-2 small">
                  {user?.role === ROLES.ADMIN && (
                    <>
                      <li>
                        <NavLink to={ROUTES.ORDER_MANAGEMENT} className="dropdown-item d-flex align-items-center gap-2 rounded-2">
                          <i className="bi bi-speedometer2 text-primary"></i>
                          <span>Order Management</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={ROUTES.MENU_MANAGEMENT} className="dropdown-item d-flex align-items-center gap-2 rounded-2">
                          <i className="bi bi-list-ul text-primary"></i>
                          <span>Menu Management</span>
                        </NavLink>
                      </li>
                      <li><hr className="dropdown-divider my-2" /></li>
                    </>
                  )}
                  <li>
                    <button onClick={handleLogout} className="dropdown-item d-flex align-items-center gap-2 text-danger rounded-2">
                      <i className="bi bi-box-arrow-right"></i>
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink 
                    to={ROUTES.LOGIN} 
                    className="px-3 py-2 rounded-pill text-decoration-none fw-semibold"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                    }}
                  >
                    <i className="bi bi-person fs-6"></i>
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    to={ROUTES.REGISTER} 
                    className="px-3 py-2 rounded-pill text-decoration-none fw-semibold"
                    style={{
                      background: 'transparent',
                      color: '#667eea',
                      border: '2px solid #667eea',
                      transition: 'all 0.2s',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#667eea';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <i className="bi bi-stars fs-6"></i>
                    Register
                  </NavLink>
                </li>
              </>
            )}

            {/* Theme toggle — desktop */}
            <li className="nav-item d-none d-lg-flex align-items-center ms-2">
              <div
                className="hdr-icon-btn position-relative d-flex align-items-center justify-content-center text-decoration-none"
                role="button"
                onClick={() => dispatch(toggleTheme())}
                style={{ cursor: "pointer" }}
              >
                <i className={`bi ${themeIcon} fs-5`}></i>
              </div>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Header