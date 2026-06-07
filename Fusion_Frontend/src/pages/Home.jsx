import { Link } from 'react-router-dom'
import { useGetMenuItemsQuery } from '../store/api/menuItemsApi';
import { API_BASE_URL, CATEGORY, ROUTES, SPECIAL_TAG } from '../utility/constant';
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { addToCart } from '../store/slice/cartSlice';
// import { toast } from 'react-toastify';
import toast from "react-hot-toast";
import Carousel from '../components/ui/Carousel';
import './Home.css';



function Home() {

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  const [activeTag, setActiveTag] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const {
    data: menuItems = [],
    isLoading,
    error,
    refetch
  } = useGetMenuItemsQuery();


  const getThemeStyles = () => {
    if (theme === "dark") {
      return {  background: `radial-gradient(ellipse at 30% 80%, #003322 0%, #000d0a 50%, #000000 100%)`};
    }
    return { background: `linear-gradient(135deg, #a8edea 0%, #fed6e3 25%, #d299c2 50%, #fef9d7 75%, #a8edea 100%)` };
  };

  const tags = ["all", ...new Set(menuItems.map((item) => item.specialTag)
    .filter((tag) => tag)
  )];

  const filteredItems = menuItems.filter((item) => {
    const searchMatch = searchTerm ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    const categoryMatch = categoryFilter === "All" || item.category === categoryFilter;
    const tagMatch = activeTag === "all" || item.specialTag === activeTag;
    return searchMatch && categoryMatch && tagMatch;
  })

  const handleAddToCart = (item) => {
    dispatch(addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    }));
    toast.success(`${item.name} added to cart`);
  }

  return (
    // <>
    //   <Carousel />
    //   <div className="container-fluid px-0 py-3 py-md-4">
    //     <div className="container px-3 px-md-4" id="menu">
    //       {/* Filters */}
    //       <div className="mb-4">
    //         <div className="d-flex flex-column flex-sm-row flex-wrap gap-2 align-items-stretch align-items-sm-center mb-3">

    //           {/* Search pill */}
    //           <div
    //             className="d-flex align-items-center gap-2 flex-grow-1"
    //             style={{
    //               border: "1.5px solid var(--bs-border-color)",   // ✅ fixed
    //               borderRadius: "999px",
    //               padding: "0 18px",
    //               height: "48px",
    //               background: "var(--bs-body-bg)",                // ✅ fixed
    //               minWidth: "0",
    //               transition: "border-color 0.15s",
    //             }}
    //           >
    //             <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    //               stroke="#D85A30" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
    //               style={{ flexShrink: 0 }}>
    //               <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    //             </svg>
    //             <input
    //               type="text"
    //               placeholder="What are you craving?"
    //               style={{
    //                 border: "none", outline: "none", fontSize: "14px",
    //                 background: "transparent",
    //                 color: "var(--bs-body-color)",                // ✅ fixed
    //                 width: "100%", minWidth: 0,
    //               }}
    //               value={searchTerm}
    //               onChange={(e) => setSearchTerm(e.target.value)}
    //             />
    //             {searchTerm && (
    //               <button
    //                 onClick={() => setSearchTerm("")}
    //                 style={{
    //                   border: "none", background: "none", cursor: "pointer",
    //                   padding: "4px", display: "flex", alignItems: "center",
    //                   color: "#9ca3af", flexShrink: 0,
    //                 }}
    //                 onMouseEnter={(e) => e.currentTarget.style.color = "#D85A30"}
    //                 onMouseLeave={(e) => e.currentTarget.style.color = "#9ca3af"}
    //               >
    //                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    //                   stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    //                   <line x1="18" y1="6" x2="6" y2="18" />
    //                   <line x1="6" y1="6" x2="18" y2="18" />
    //                 </svg>
    //               </button>
    //             )}
    //             <div style={{ width: "1px", height: "20px", background: "var(--bs-border-color)", flexShrink: 0 }} />  {/* ✅ fixed */}
    //             <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    //               stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    //               style={{ flexShrink: 0 }}>
    //               <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
    //               <line x1="8" y1="18" x2="21" y2="18" />
    //             </svg>
    //           </div>

    //           {/* Category + Button row */}
    //           <div className="d-flex gap-2 align-items-center">
    //             <div className="position-relative flex-grow-1" style={{ minWidth: "130px" }}>
    //               <select
    //                 value={categoryFilter}
    //                 onChange={(e) => setCategoryFilter(e.target.value)}
    //                 style={{
    //                   height: "48px", width: "100%", borderRadius: "999px",
    //                   border: "1.5px solid var(--bs-border-color)",  // ✅ fixed
    //                   background: "var(--bs-body-bg)",               // ✅ fixed
    //                   color: "var(--bs-body-color)",                  // ✅ fixed
    //                   fontSize: "14px", padding: "0 36px 0 18px",
    //                   appearance: "none", outline: "none", cursor: "pointer",
    //                 }}
    //               >
    //                 <option value="All">All categories</option>
    //                 {CATEGORY.map((category) => (
    //                   <option value={category} key={category}>
    //                     {category}
    //                   </option>
    //                 ))}
    //               </select>
    //               <svg className="position-absolute top-50 translate-middle-y"
    //                 style={{ right: "14px", pointerEvents: "none" }}
    //                 width="13" height="13" viewBox="0 0 24 24" fill="none"
    //                 stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    //                 <polyline points="6 9 12 15 18 9" />
    //               </svg>
    //             </div>

    //             <button
    //               style={{
    //                 height: "48px", padding: "0 22px", borderRadius: "999px",
    //                 border: "none", background: "#D85A30", color: "#fff",
    //                 fontSize: "14px", fontWeight: 500, cursor: "pointer",
    //                 display: "flex", alignItems: "center", gap: "8px",
    //                 whiteSpace: "nowrap", flexShrink: 0,
    //               }}
    //             >
    //               Search
    //             </button>
    //           </div>
    //         </div>

    //         {/* Quick filter tags */}
    //         <div className="d-flex flex-wrap gap-2">
    //           {tags.map((tag) => (
    //             <button
    //               key={tag}
    //               onClick={() => setActiveTag(tag)}
    //               style={{
    //                 height: "30px", padding: "0 14px", borderRadius: "999px",
    //                 border: activeTag === tag ? "1px solid #F0997B" : "1px solid var(--bs-border-color)",   // ✅ fixed
    //                 background: activeTag === tag ? "#FAECE7" : "var(--bs-tertiary-bg)",                    // ✅ fixed
    //                 color: activeTag === tag ? "#712B13" : "var(--bs-secondary-color)",                     // ✅ fixed
    //                 fontSize: "12px", fontWeight: 500, cursor: "pointer",
    //                 display: "flex", alignItems: "center", gap: "6px",
    //                 transition: "all 0.12s",
    //               }}
    //             >
    //               <span style={{
    //                 width: 6, height: 6, borderRadius: "50%",
    //                 background: "currentColor", opacity: 0.7, display: "inline-block"
    //               }} />
    //               {tag === "all" ? "All" : tag}
    //             </button>
    //           ))}
    //         </div>
    //       </div>

    //       {/* Loading State */}
    //       {isLoading && (
    //         <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3 mb-5">
    //           <div className="col">
    //             <div className="card h-100 placeholder-glow">
    //               <div className="card-img-top bg-body-secondary" style={{ height: "160px" }}></div>
    //               <div className="card-body">
    //                 <h5 className="card-title placeholder col-6"></h5>
    //                 <p className="card-text placeholder col-9"></p>
    //                 <p className="card-text placeholder col-4"></p>
    //                 <div className="d-flex gap-2 mt-3">
    //                   <span className="placeholder btn btn-primary disabled col-6"></span>
    //                   <span className="placeholder btn btn-outline-primary disabled col-6"></span>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       )}

    //       {error && (
    //         <div className="alert alert-danger" role="alert">
    //           Error loading menu items: Unknown error
    //         </div>
    //       )}

    //       {!isLoading && !error && (filteredItems.length === 0 ? (
    //         <div className="text-center py-5">
    //           {menuItems.length === 0 ? (
    //             <>
    //               <i className="bi bi-basket text-muted" style={{ fontSize: "3rem" }}></i>
    //               <h4 className="mt-3">No menu items available</h4>
    //               <p className="text-muted">Check back later for our delicious menu!</p>
    //             </>
    //           ) : (
    //             <>
    //               <i className="bi bi-search text-muted" style={{ fontSize: "3rem" }}></i>
    //               <h4 className="mt-3">No results for "{searchTerm || categoryFilter}"</h4>
    //               <p className="text-muted">Try a different name or category</p>
    //               <button
    //                 onClick={() => { setSearchTerm(""); setCategoryFilter("All"); setActiveTag("all"); }}
    //                 style={{
    //                   marginTop: "8px", padding: "8px 20px", borderRadius: "999px",
    //                   border: "1.5px solid #D85A30", background: "none",
    //                   color: "#D85A30", fontSize: "13px", cursor: "pointer",
    //                 }}
    //               >
    //                 Clear filters
    //               </button>
    //             </>
    //           )}
    //         </div>
    //       ) : (
    //         <div className="mt-3">
    //           <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3 mb-5">
    //             {filteredItems.map((item) => (
    //               <div key={item.id} className="col">
    //                 <div className="card h-100 border shadow-sm position-relative w-100">
    //                   <div className="position-relative overflow-hidden rounded-top">
    //                     <img
    //                       className="card-img-top"
    //                       src={`${API_BASE_URL}/${item.image}`}
    //                       onError={(e) => { e.target.src = "https://placehold.co/100"; }}
    //                       style={{ height: "160px", objectFit: "cover", transition: "transform 0.3s ease" }}
    //                     />
    //                     {item.specialTag && (
    //                       <div className="position-absolute top-0 end-0 m-2">
    //                         <span className="badge bg-warning px-2 py-1 rounded-3 shadow-sm fw-semibold" style={{ fontSize: "11px" }}>
    //                           {item.specialTag}
    //                         </span>
    //                       </div>
    //                     )}
    //                   </div>
    //                   <div className="card-body d-flex flex-column p-3">
    //                     <div className="d-flex justify-content-between align-items-center mb-2">
    //                       <h6 className="card-title fw-bold mb-0 lh-sm flex-grow-1 me-2">{item.name}</h6>
    //                       <div className="h6 text-primary fw-bold mb-0 flex-shrink-0">₹{parseFloat(item.price).toFixed(2)}</div>
    //                     </div>
    //                     <div className="d-flex justify-content-between align-items-center mb-2">
    //                       <span className="badge text-secondary border px-2 py-1" style={{ fontSize: "11px" }}>{item.category}</span>
    //                     </div>
    //                     <p className="card-text text-muted mb-3 flex-grow-1" style={{ fontSize: "0.8rem", lineHeight: "1.4" }}>
    //                       {item.description?.length > 70 ? `${item.description.slice(0, 70)}...` : item.description}
    //                     </p>
    //                     <div className="mt-auto">
    //                       <div className="row g-2">
    //                         <div className="col-6">
    //                           <Link to={ROUTES.MENU_DETAIL.replace(":id", item.id)} className="btn btn-outline-primary w-100 btn-sm fw-semibold">
    //                             <i className="bi bi-info-circle me-1"></i>Details
    //                           </Link>
    //                         </div>
    //                         <div className="col-6">
    //                           <button className="btn btn-primary w-100 btn-sm fw-semibold" onClick={() => handleAddToCart(item)}>
    //                             <i className="bi bi-cart-plus me-1"></i>Add Cart
    //                           </button>
    //                         </div>
    //                       </div>
    //                     </div>
    //                   </div>
    //                   <div className="position-absolute bottom-0 start-0 w-100"
    //                     style={{ height: "3px", background: "linear-gradient(90deg, var(--bs-primary), transparent)" }}>
    //                   </div>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       ))}

    //       <section className="py-4 py-md-5 border-top">
    //         <div className="text-center mb-4 mb-md-5">
    //           <h2 className="fw-bold">Why Choose MangoFusion?</h2>
    //           <p className="text-muted mb-0">We deliver freshness, flavor, and a premium ordering experience.</p>
    //         </div>
    //         <div className="row g-3 g-md-4">
    //           <div className="col-12 col-md-4">
    //             <div className="card h-100 border-0 shadow-sm">
    //               <div className="card-body text-center p-3 p-md-4">
    //                 <i className="bi bi-egg-fried text-primary" style={{ fontSize: "2.5rem" }}></i>
    //                 <h5 className="mt-3">Quality Food</h5>
    //                 <p className="text-muted small mb-0">Fresh ingredients and authentic recipes for exceptional taste.</p>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="col-12 col-md-4">
    //             <div className="card h-100 border-0 shadow-sm">
    //               <div className="card-body text-center p-3 p-md-4">
    //                 <i className="bi bi-lightning-charge text-primary" style={{ fontSize: "2.5rem" }}></i>
    //                 <h5 className="mt-3">Fast Pickup</h5>
    //                 <p className="text-muted small mb-0">Quick preparation and streamlined collection process.</p>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="col-12 col-md-4">
    //             <div className="card h-100 border-0 shadow-sm">
    //               <div className="card-body text-center p-3 p-md-4">
    //                 <i className="bi bi-stars text-primary" style={{ fontSize: "2.5rem" }}></i>
    //                 <h5 className="mt-3">Great Service</h5>
    //                 <p className="text-muted small mb-0">Friendly support and attention to every detail.</p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </section>
    //     </div>
    //   </div>
    // </>






 <>
      <Carousel />
 
      <div className="home-wrapper py-3 py-md-4" style={getThemeStyles()}>
        <div className="container px-3 px-md-4" id="menu">
 
          {/* ── Filters (untouched) ── */}
          <div className="mb-4">
            <div className="d-flex flex-column flex-sm-row flex-wrap gap-2 align-items-stretch align-items-sm-center mb-3">
 
              {/* Search pill */}
              <div
                className="d-flex align-items-center gap-2 flex-grow-1"
                style={{
                  border: "1.5px solid var(--bs-border-color)",
                  borderRadius: "999px",
                  padding: "0 18px",
                  height: "48px",
                  background: "var(--bs-body-bg)",
                  minWidth: "0",
                  transition: "border-color 0.15s",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="#D85A30" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ flexShrink: 0 }}>
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="What are you craving?"
                  style={{
                    border: "none", outline: "none", fontSize: "14px",
                    background: "transparent",
                    color: "var(--bs-body-color)",
                    width: "100%", minWidth: 0,
                  }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    style={{
                      border: "none", background: "none", cursor: "pointer",
                      padding: "4px", display: "flex", alignItems: "center",
                      color: "#9ca3af", flexShrink: 0,
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#D85A30"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#9ca3af"}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
                <div style={{ width: "1px", height: "20px", background: "var(--bs-border-color)", flexShrink: 0 }} />
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ flexShrink: 0 }}>
                  <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                </svg>
              </div>
 
              {/* Category + Button row */}
              <div className="d-flex gap-2 align-items-center">
                <div className="position-relative flex-grow-1" style={{ minWidth: "130px" }}>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    style={{
                      height: "48px", width: "100%", borderRadius: "999px",
                      border: "1.5px solid var(--bs-border-color)",
                      background: "var(--bs-body-bg)",
                      color: "var(--bs-body-color)",
                      fontSize: "14px", padding: "0 36px 0 18px",
                      appearance: "none", outline: "none", cursor: "pointer",
                    }}
                  >
                    <option value="All">All categories</option>
                    {CATEGORY.map((category) => (
                      <option value={category} key={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <svg className="position-absolute top-50 translate-middle-y"
                    style={{ right: "14px", pointerEvents: "none" }}
                    width="13" height="13" viewBox="0 0 24 24" fill="none"
                    stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
 
                <button
                  style={{
                    height: "48px", padding: "0 22px", borderRadius: "999px",
                    border: "none", background: "#D85A30", color: "#fff",
                    fontSize: "14px", fontWeight: 500, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: "8px",
                    whiteSpace: "nowrap", flexShrink: 0,
                  }}
                >
                  Search
                </button>
              </div>
            </div>
 
            {/* Quick filter tags */}
            <div className="d-flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  style={{
                    height: "30px", padding: "0 14px", borderRadius: "999px",
                    border: activeTag === tag ? "1px solid #F0997B" : "1px solid var(--bs-border-color)",
                    background: activeTag === tag ? "#FAECE7" : "var(--bs-tertiary-bg)",
                    color: activeTag === tag ? "#712B13" : "var(--bs-secondary-color)",
                    fontSize: "12px", fontWeight: 500, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: "6px",
                    transition: "all 0.12s",
                  }}
                >
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "currentColor", opacity: 0.7, display: "inline-block"
                  }} />
                  {tag === "all" ? "All" : tag}
                </button>
              ))}
            </div>
          </div>
         
 
         
          {isLoading && (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3 mb-5">
              {[1, 2, 3].map((n) => (
                <div className="col" key={n}>
                  <div className="menu-card card h-100 border-0 shadow-sm placeholder-glow">
                    <div className="placeholder menu-card__img-placeholder rounded-top-3 bg-secondary-subtle"></div>
                    <div className="card-body p-3">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="placeholder col-5 rounded-2"></span>
                        <span className="placeholder col-3 rounded-2"></span>
                      </div>
                      <span className="placeholder col-3 rounded-pill mb-2 d-block" style={{ height: "20px" }}></span>
                      <p className="mb-1"><span className="placeholder col-10 rounded-2"></span></p>
                      <p className="mb-3"><span className="placeholder col-7 rounded-2"></span></p>
                      <div className="d-flex gap-2">
                        <span className="placeholder btn btn-outline-primary disabled col-6 rounded-pill"></span>
                        <span className="placeholder btn btn-primary disabled col-6 rounded-pill"></span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
 
       

          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2 rounded-3" role="alert">
              <i className="bi bi-exclamation-triangle-fill fs-5"></i>
              <span>Error loading menu items. Please try again.</span>
            </div>
          )}


 
       
          {!isLoading && !error && (
            filteredItems.length === 0 ? (
              /* Empty state */
              <div className="empty-state text-center py-5 my-2 " >
                {menuItems.length === 0 ? (
                  <>
                    <div className="empty-state__icon mb-3">
                      <i className="bi bi-basket text-muted"></i>
                    </div>
                    <h5 className="fw-semibold mb-1">No menu items yet</h5>
                    <p className="text-muted small mb-0">Check back later for our delicious menu!</p>
                  </>
                ) : (
                  <>
                    <div className="empty-state__icon mb-3">
                      <i className="bi bi-search text-muted"></i>
                    </div>
                    <h5 className="fw-semibold mb-1">No results found</h5>
                    <p className="text-muted small mb-3">
                      Nothing matched &ldquo;{searchTerm || categoryFilter}&rdquo;. Try a different search.
                    </p>
                    <button
                      onClick={() => { setSearchTerm(""); setCategoryFilter("All"); setActiveTag("all"); }}
                      className="btn btn-sm btn-outline-primary rounded-pill px-4"
                    >
                      Clear filters
                    </button>
                  </>
                )}
              </div>
            ) : (
              /* Menu grid */
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3 mb-5 mt-1">
                {filteredItems.map((item) => (
                  <div key={item.id} className="col">
                    <div className="menu-card card h-100 border-0 shadow-sm">
 
                      {/* Image */}
                      <div className="menu-card__img-wrap  position-relative overflow-hidden rounded-top-3">
                        <img
                          className="menu-card__img w-100"
                          src={`${API_BASE_URL}/${item.image}`}
                          alt={item.name}
                          onError={(e) => { e.target.src = "https://placehold.co/400x200?text=No+Image"; }}
                        />
                        {item.specialTag && (
                          <span className="menu-card__badge badge rounded-pill text-bg-warning px-3 py-2 fw-bold text-uppercase shadow-sm position-absolute top-0 end-0 m-2">
                            {item.specialTag}
                          </span>
                        )}
                      </div>
 
                      {/* Body */}
                      <div className="card-body d-flex flex-column p-3">
 
                        {/* Name + Price */}
                        <div className="d-flex justify-content-between align-items-start gap-2 mb-1">
                          <h6 className="menu-card__name fw-bold mb-0 lh-sm">{item.name}</h6>
                          <span className="menu-card__price fw-bold text-primary flex-shrink-0 fs-4">
                            ₹{parseFloat(item.price).toFixed(2)}
                          </span>
                        </div>
 
                        {/* Category chip */}
                        <div className="mb-2">
                          <span className="menu-card__category badge rounded-pill">
                            {item.category}
                          </span>
                        </div>
 
                        {/* Description */}
                        <p className="menu-card__desc text-muted mb-3 flex-grow-1">
                          {item.description?.length > 70
                            ? `${item.description.slice(0, 70)}…`
                            : item.description}
                        </p>
 
                        {/* Actions */}
                        <div className="row g-2 mt-auto">
                          <div className="col-6">
                            <Link
                              to={ROUTES.MENU_DETAIL.replace(":id", item.id)}
                              className="btn btn-outline-orange btn-sm w-100 rounded-pill fw-semibold"
                            >
                              <i className="bi bi-info-circle me-1"></i>Details
                            </Link>
                          </div>
                          <div className="col-6">
                            <button
                              className="btn btn-orange btn-sm w-100 rounded-pill fw-semibold"
                              onClick={() => handleAddToCart(item)}
                            >
                              <i className="bi bi-cart-plus me-1"></i>Add Cart
                            </button>
                          </div>
                        </div>
                      </div>
 
                      {/* Bottom accent bar */}
                      <div className="menu-card__accent" aria-hidden="true"></div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
 
          {/* ── Why Choose MangoFusion ── */}
          <section className="why-section py-4 py-md-5 border-top mt-2">
            <div className="text-center mb-4">
              <h2 className="why-section__title fw-bold mb-1">Why Choose Fusion?</h2>
              <p className="text-muted mb-0 small">Freshness, flavour, and a premium ordering experience.</p>
            </div>
 
            <div className="row g-3">
              {[
                {
                  icon: "bi-egg-fried",
                  title: "Quality Food",
                  desc: "Fresh ingredients and authentic recipes for exceptional taste.",
                },
                {
                  icon: "bi-lightning-charge",
                  title: "Fast Pickup",
                  desc: "Quick preparation and streamlined collection process.",
                },
                {
                  icon: "bi-stars",
                  title: "Great Service",
                  desc: "Friendly support and attention to every detail.",
                },
              ].map(({ icon, title, desc }) => (
                <div className="col-12 col-md-4" key={title}>
                  <div className="why-card card h-100 border-0 text-center p-3 p-md-4">
                    <div className="why-card__icon-wrap mx-auto mb-3">
                      <i className={`bi ${icon} why-card__icon text-primary`}></i>
                    </div>
                    <h6 className="fw-bold mb-1">{title}</h6>
                    <p className="text-muted small mb-0">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
 
        </div>
      </div>
    </>














  
  
);





}

export default Home