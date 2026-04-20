import { useState, useEffect, useRef } from "react";

const slides = [
  {
    id: 0,
    badge: "Fresh & Hot",
    headline: "Savor Every",
    accent: "Bite",
    sub: "Made fresh daily, served with passion. Experience culinary excellence in every bite.",
    cta: "Order Now",
    features: ["Fresh Ingredients Daily", "Quick Pickup Service"],
    stats: [{ label: "Dishes", value: "50+" }, { label: "Pickup", value: "15 min" }],
    icon: "🍲",
    cardTitle: "Fresh & Delicious",
    bg: "#1a0800",
    accent1: "#ff6b35",
    accent2: "#ffb347",
    gradStop: "#3d1a00",
  },
  {
    id: 1,
    badge: "Quality Guaranteed",
    headline: "Premium",
    accent: "Cuisine",
    sub: "Every dish prepared with the finest ingredients and culinary expertise. Taste the difference.",
    cta: "View Menu",
    features: ["Chef's Special Recipes", "5-Star Customer Rating"],
    stats: [{ label: "Satisfaction", value: "98%" }, { label: "Rating", value: "5 ★" }],
    icon: "🏆",
    cardTitle: "Award Winning",
    bg: "#001a0f",
    accent1: "#2dce89",
    accent2: "#a3f7bf",
    gradStop: "#003d22",
  },
  {
    id: 2,
    badge: "Chef's Special",
    headline: "Culinary",
    accent: "Excellence",
    sub: "Signature dishes crafted by master chefs with years of experience and passion.",
    cta: "Try Our Specials",
    features: ["Master Chef Prepared", "Made with Passion"],
    stats: [{ label: "Specialties", value: "20+" }, { label: "Served", value: "Hot ♨" }],
    icon: "👨‍🍳",
    cardTitle: "Expert Chefs",
    bg: "#100018",
    accent1: "#c77dff",
    accent2: "#e0aaff",
    gradStop: "#2a0045",
  },
  {
  id: 3,
  badge: "Fast Delivery",
  headline: "Lightning",
  accent: "Delivery",
  sub: "Get your favorite meals delivered hot and fresh at your doorstep in no time.",
  cta: "Order Fast",
  features: ["30 min Delivery", "Live Order Tracking"],
  stats: [
    { label: "Delivery", value: "30 min" },
    { label: "Orders", value: "10K+" }
  ],
  icon: "🚀",
  cardTitle: "Super Fast",
  bg: "#00101a",
  accent1: "#00c2ff",
  accent2: "#80eaff",
  gradStop: "#002b45",
}
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const timerRef = useRef(null);
  const nextRef = useRef(0);

  const go = (idx) => {
    if (fading || idx === nextRef.current) return;
    nextRef.current = idx;
    setFading(true);
    setTimeout(() => {
      setCurrent(idx);
      setFading(false);
    }, 280);
  };

  const goNext = () => go((nextRef.current + 1) % slides.length);
  const goPrev = () => go((nextRef.current - 1 + slides.length) % slides.length);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, 5500);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const onTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? goNext() : goPrev(); startTimer(); }
    setTouchStart(null);
  };

  const s = slides[current];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Inter:wght@300;400;500&display=swap');

        .hc { position:relative; width:100%; overflow:hidden; background:#0d0d0d; font-family:'Inter',sans-serif; -webkit-tap-highlight-color:transparent; user-select:none; }

        .hc-bg { position:absolute; inset:0; z-index:0; transition:background 0.5s ease; }

        .hc-body {
          position:relative; z-index:1;
          transition: opacity 0.28s ease;
          padding: 44px 28px 76px;
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 36px;
          min-height: 460px;
        }
        .hc-body.out { opacity:0; }

        .hc-left { flex:1; min-width:0; }

        .hc-badge {
          display:inline-flex; align-items:center; gap:7px;
          font-size:11px; font-weight:500; letter-spacing:0.1em; text-transform:uppercase;
          padding:5px 14px; border-radius:100px; margin-bottom:18px; border:1px solid;
        }

        .hc-h1 {
          font-family:'Playfair Display',serif; font-weight:700;
          font-size:clamp(2.2rem,5.5vw,4rem); color:#fff;
          line-height:1.05; margin:0 0 2px;
        }
        .hc-h1-accent {
          font-family:'Playfair Display',serif; font-style:italic; font-weight:400;
          font-size:clamp(2.6rem,6.5vw,4.8rem); line-height:1.05; display:block; margin-bottom:18px;
        }

        .hc-sub { font-size:14px; font-weight:300; line-height:1.75; color:rgba(255,255,255,0.48); max-width:400px; margin-bottom:22px; }

        .hc-feats { display:flex; flex-direction:column; gap:7px; margin-bottom:26px; }
        .hc-feat { display:flex; align-items:center; gap:8px; font-size:12.5px; color:rgba(255,255,255,0.42); font-weight:300; }
        .hc-feat-dot { width:4px; height:4px; border-radius:50%; flex-shrink:0; }

        .hc-cta {
          display:inline-flex; align-items:center; gap:9px;
          font-family:'Inter',sans-serif; font-size:13px; font-weight:500; letter-spacing:0.02em;
          padding:12px 26px; border-radius:100px; border:none; cursor:pointer; color:#fff; text-decoration:none;
        }

        .hc-card {
          width:240px; flex-shrink:0;
          background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:18px;
          padding:24px 18px; text-align:center;
        }
        .hc-card-icon { font-size:2.6rem; line-height:1; margin-bottom:12px; }
        .hc-card-title { font-family:'Playfair Display',serif; font-size:1.1rem; font-weight:700; color:#fff; margin-bottom:14px; }
        .hc-stats { display:flex; justify-content:center; }
        .hc-stat { flex:1; }
        .hc-stat+.hc-stat { border-left:1px solid rgba(255,255,255,0.1); }
        .hc-stat-val { font-family:'Playfair Display',serif; font-size:1.4rem; font-weight:700; margin-bottom:3px; }
        .hc-stat-lbl { font-size:10px; letter-spacing:0.08em; text-transform:uppercase; color:rgba(255,255,255,0.28); }

        .hc-bar {
          position:absolute; bottom:0; left:0; right:0; height:56px;
          display:flex; align-items:center; justify-content:space-between;
          padding:0 28px; z-index:5;
        }
        .hc-num { font-size:11px; color:rgba(255,255,255,0.2); letter-spacing:0.12em; }

        .hc-dots { display:flex; align-items:center; gap:7px; position:absolute; left:50%; transform:translateX(-50%); }
        .hc-dot {
          width:6px; height:6px; border-radius:3px;
          background:rgba(255,255,255,0.18); border:none; padding:0; cursor:pointer;
          transition:width 0.3s ease, background 0.3s ease;
        }
        .hc-dot.on { width:20px; }

        .hc-navs { display:flex; gap:7px; }
        .hc-nav {
          width:34px; height:34px; border-radius:50%;
          background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);
          color:rgba(255,255,255,0.55); cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          transition:background 0.2s, color 0.2s;
        }
        .hc-nav:hover { background:rgba(255,255,255,0.12); color:#fff; }

        @media (max-width:600px) {
          .hc-body { flex-direction:column; padding:32px 18px 68px; min-height:0; gap:20px; }
          .hc-card {
            width:100%; flex-direction:row; display:flex;
            align-items:center; gap:14px; text-align:left;
            padding:16px 18px; border-radius:14px;
          }
          .hc-card-icon { margin-bottom:0; font-size:2rem; flex-shrink:0; }
          .hc-card-info { flex:1; }
          .hc-card-title { margin-bottom:10px; font-size:1rem; }
          .hc-stats { justify-content:flex-start; gap:16px; }
          .hc-stat { flex:none; }
          .hc-stat+.hc-stat { border-left:none; }
          .hc-bar { padding:0 18px; }
        }
      `}</style>

      <div className="hc" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

        <div
          className="hc-bg"
          style={{ background: `linear-gradient(140deg, ${s.bg} 0%, ${s.gradStop} 55%, ${s.bg} 100%)` }}
        />

        <div className={`hc-body${fading ? " out" : ""}`}>

          {/* Left column */}
          <div className="hc-left">
            <div className="hc-badge" style={{ background:`${s.accent1}18`, color:s.accent2, borderColor:`${s.accent1}28` }}>
              <span style={{ width:5, height:5, borderRadius:"50%", background:s.accent1, display:"inline-block" }} />
              {s.badge}
            </div>

            <h1 className="hc-h1">{s.headline}</h1>
            <span className="hc-h1-accent" style={{ color:s.accent1 }}>{s.accent}</span>

            <p className="hc-sub">{s.sub}</p>

            <div className="hc-feats">
              {s.features.map(f => (
                <div key={f} className="hc-feat">
                  <span className="hc-feat-dot" style={{ background:s.accent1 }} />
                  {f}
                </div>
              ))}
             </div>

            <a href="#menu" className="hc-cta" style={{ background:s.accent1 }}>
              {s.cta}
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Right card */}
          <div className="hc-card">
            <div className="hc-card-icon">{s.icon}</div>
            <div className="hc-card-info">
              <div className="hc-card-title">{s.cardTitle}</div>
              <div className="hc-stats">
                {s.stats.map(st => (
                  <div key={st.label} className="hc-stat">
                    <div className="hc-stat-val" style={{ color:s.accent2 }}>{st.value}</div>
                    <div className="hc-stat-lbl">{st.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="hc-bar">
          <span className="hc-num">0{current + 1} / 0{slides.length}</span>

          <div className="hc-dots">
            {slides.map((sl, i) => (
              <button
                key={sl.id}
                className={`hc-dot${i === current ? " on" : ""}`}
                style={i === current ? { background: s.accent1 } : {}}
                onClick={() => { go(i); startTimer(); }}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="hc-navs">
            <button className="hc-nav" onClick={() => { goPrev(); startTimer(); }} aria-label="Previous">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M8.5 3L5 6.5l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="hc-nav" onClick={() => { goNext(); startTimer(); }} aria-label="Next">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M4.5 3L8 6.5 4.5 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </>
  );
}



// function Carousel() {
//   return (
//     <>
//       {/* Add floating animation styles */}
//       <style>
//         {`
//           @keyframes float {
//             0%, 100% { transform: translateY(0px); }
//             50% { transform: translateY(-20px); }
//           }
//           @keyframes pulse {
//             0%, 100% { opacity: 0.4; }
//             50% { opacity: 0.8; }
//           }
//         `}
//       </style>

//       <div
//         id="heroCarousel"
//         className="carousel slide mb-4"
//         data-bs-ride="carousel"
//         data-bs-interval="6000"
//       >
//         <div className="carousel-indicators">
//           <button
//             type="button"
//             data-bs-target="#heroCarousel"
//             data-bs-slide-to="0"
//             className="active"
//             aria-current="true"
//             aria-label="Slide 1"
//           ></button>
//           <button
//             type="button"
//             data-bs-target="#heroCarousel"
//             data-bs-slide-to="1"
//             aria-label="Slide 2"
//           ></button>
//           <button
//             type="button"
//             data-bs-target="#heroCarousel"
//             data-bs-slide-to="2"
//             aria-label="Slide 3"
//           ></button>
//         </div>

//         <div className="carousel-inner">
//           {/* First Slide - Fresh Food Theme */}
//           <div className="carousel-item active">
//             <div
//               className="py-5 d-flex align-items-center"
//               style={{
//                 minHeight: "600px",
//                 height: "600px",
//                 background:
//                   "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 25%, #ff6b6b 50%, #d63031 75%, #b33939 100%)",
//                 position: "relative",
//               }}
//             >
//               {/* Animated floating elements */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "10%",
//                   right: "10%",
//                   width: "100px",
//                   height: "100px",
//                   background: "rgba(255, 193, 7, 0.1)",
//                   borderRadius: "50%",
//                   filter: "blur(20px)",
//                   animation: "float 6s ease-in-out infinite",
//                 }}
//               ></div>
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: "20%",
//                   left: "15%",
//                   width: "60px",
//                   height: "60px",
//                   background: "rgba(40, 167, 69, 0.1)",
//                   borderRadius: "50%",
//                   filter: "blur(15px)",
//                   animation: "float 4s ease-in-out infinite reverse",
//                 }}
//               ></div>

//               {/* Subtle overlay */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   bottom: 0,
//                   background: "rgba(0,0,0,0.1)",
//                   pointerEvents: "none",
//                 }}
//               ></div>

//               <div className="container h-100">
//                 <div className="row align-items-center w-100 h-100">
//                   <div className="col-lg-7">
//                     <div className="mb-4">
//                       <span className="badge bg-gradient bg-warning fs-6 px-3 py-2 rounded-pill">
//                         <i className="bi bi-fire me-2"></i>Fresh & Hot
//                       </span>
//                     </div>
//                     <h1 className="display-2 fw-bold mb-4 text-white">
//                       Savor Every
//                       <span className="d-block text-warning fst-italic">
//                         Bite
//                       </span>
//                     </h1>
//                     <p className="lead mb-4 text-white-50 fs-4">
//                       Experience culinary excellence with our carefully crafted
//                       dishes.
//                       <span className="text-warning fw-semibold">
//                         Made fresh daily
//                       </span>
//                       , served with passion.
//                     </p>

//                     {/* Feature highlights */}
//                     <div className="row mb-4">
//                       <div className="col-md-6 mb-2">
//                         <div className="d-flex align-items-center">
//                           <i className="bi bi-check-circle-fill text-success me-2"></i>
//                           <small className="text-white-50">
//                             Fresh Ingredients Daily
//                           </small>
//                         </div>
//                       </div>
//                       <div className="col-md-6 mb-2">
//                         <div className="d-flex align-items-center">
//                           <i className="bi bi-check-circle-fill text-success me-2"></i>
//                           <small className="text-white-50">
//                             Quick Pickup Service
//                           </small>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="d-flex gap-3 flex-wrap">
//                       <a
//                         href="#menu"
//                         className="btn btn-warning btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg"
//                         style={{
//                           background:
//                             "linear-gradient(45deg, #ffc107, #ffb300)",
//                           border: "none",
//                           transition: "all 0.3s ease",
//                         }}
//                       >
//                         <i className="bi bi-basket me-2"></i>Order Now
//                       </a>
//                     </div>
//                   </div>

//                   <div className="col-lg-5 d-none d-lg-block text-center">
//                     <div className="position-relative">
//                       {/* Main feature card */}
//                       <div
//                         className="card bg-gradient shadow-lg border-0"
//                         style={{
//                           background: "rgba(255, 255, 255, 0.1)",
//                           backdropFilter: "blur(10px)",
//                           border: "1px solid rgba(255, 255, 255, 0.2)",
//                         }}
//                       >
//                         <div className="card-body p-5 text-center">
//                           <div className="mb-4">
//                             <i className="bi bi-cup-hot display-1 text-warning"></i>
//                           </div>
//                           <h3 className="text-white mb-3">Fresh & Delicious</h3>
//                           <p className="text-white-50 mb-4">
//                             Every dish is prepared with the freshest ingredients
//                             and utmost care
//                           </p>
//                           <div className="row text-center">
//                             <div className="col-6">
//                               <div className="border-end border-light border-opacity-25">
//                                 <h4 className="text-warning mb-0">50+</h4>
//                                 <small className="text-white-50">Dishes</small>
//                               </div>
//                             </div>
//                             <div className="col-6">
//                               <h4 className="text-warning mb-0">15min</h4>
//                               <small className="text-white-50">
//                                 Pickup Time
//                               </small>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Second Slide - Quality Food Theme */}
//           <div className="carousel-item">
//             <div
//               className="py-5 d-flex align-items-center"
//               style={{
//                 minHeight: "600px",
//                 height: "600px",
//                 background:
//                   "linear-gradient(135deg, #28a745 0%, #20c997 50%, #17a2b8 100%)",
//                 position: "relative",
//               }}
//             >
//               {/* Animated floating elements */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "15%",
//                   left: "10%",
//                   width: "80px",
//                   height: "80px",
//                   background: "rgba(255, 193, 7, 0.15)",
//                   borderRadius: "50%",
//                   filter: "blur(15px)",
//                   animation: "pulse 4s ease-in-out infinite",
//                 }}
//               ></div>
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: "10%",
//                   right: "20%",
//                   width: "120px",
//                   height: "120px",
//                   background: "rgba(255, 255, 255, 0.1)",
//                   borderRadius: "50%",
//                   filter: "blur(25px)",
//                   animation: "float 5s ease-in-out infinite",
//                 }}
//               ></div>

//               {/* Overlay for better text readability */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   bottom: 0,
//                   background: "rgba(0,0,0,0.2)",
//                   pointerEvents: "none",
//                 }}
//               ></div>

//               <div className="container h-100">
//                 <div className="row align-items-center w-100 h-100">
//                   <div className="col-lg-7">
//                     <div className="mb-4">
//                       <span className="badge bg-success text-white fs-6 px-3 py-2 rounded-pill">
//                         <i className="bi bi-shield-check me-2"></i>Quality
//                         Guaranteed
//                       </span>
//                     </div>
//                     <h1 className="display-2 fw-bold mb-4 text-white">
//                       Premium
//                       <span className="d-block text-warning fst-italic">
//                         Cuisine
//                       </span>
//                     </h1>
//                     <p className="lead mb-4 text-white fs-4">
//                       Every dish is prepared with the finest ingredients and
//                       culinary expertise.
//                       <span className="text-warning fw-semibold">
//                         Taste the difference
//                       </span>{" "}
//                       in every bite.
//                     </p>

//                     {/* Feature highlights */}
//                     <div className="row mb-4">
//                       <div className="col-md-6 mb-2">
//                         <div className="d-flex align-items-center">
//                           <i className="bi bi-award-fill text-warning me-2"></i>
//                           <small className="text-white-50">
//                             Chef's Special Recipes
//                           </small>
//                         </div>
//                       </div>
//                       <div className="col-md-6 mb-2">
//                         <div className="d-flex align-items-center">
//                           <i className="bi bi-star-fill text-warning me-2"></i>
//                           <small className="text-white-50">
//                             5-Star Customer Rating
//                           </small>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="d-flex gap-3 flex-wrap">
//                       <a
//                         href="#menu"
//                         className="btn btn-success btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg"
//                         style={{
//                           background:
//                             "linear-gradient(45deg, #28a745, #20c997)",
//                           border: "none",
//                           transition: "all 0.3s ease",
//                         }}
//                       >
//                         <i className="bi bi-star me-2"></i>View Menu
//                       </a>
//                     </div>
//                   </div>

//                   <div className="col-lg-5 d-none d-lg-block text-center">
//                     <div className="position-relative">
//                       {/* Main feature card */}
//                       <div
//                         className="card bg-gradient shadow-lg border-0"
//                         style={{
//                           background: "rgba(255, 255, 255, 0.1)",
//                           backdropFilter: "blur(10px)",
//                           border: "1px solid rgba(255, 255, 255, 0.2)",
//                         }}
//                       >
//                         <div className="card-body p-5 text-center">
//                           <div className="mb-4">
//                             <i className="bi bi-award display-1 text-warning"></i>
//                           </div>
//                           <h3 className="text-white mb-3">Award Winning</h3>
//                           <p className="text-white-50 mb-4">
//                             Recognized for excellence in taste and quality by
//                             food critics
//                           </p>
//                           <div className="row text-center">
//                             <div className="col-6">
//                               <div className="border-end border-light border-opacity-25">
//                                 <h4 className="text-warning mb-0">98%</h4>
//                                 <small className="text-white-50">
//                                   Happy Customers
//                                 </small>
//                               </div>
//                             </div>
//                             <div className="col-6">
//                               <h4 className="text-warning mb-0">5★</h4>
//                               <small className="text-white-50">
//                                 Average Rating
//                               </small>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Third Slide - Chef's Special Theme */}
//           <div className="carousel-item">
//             <div
//               className="py-5 d-flex align-items-center"
//               style={{
//                 minHeight: "600px",
//                 height: "600px",
//                 background:
//                   "linear-gradient(135deg, #fd7e14 0%, #e83e8c 50%, #6f42c1 100%)",
//                 position: "relative",
//               }}
//             >
//               {/* Animated floating elements */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "20%",
//                   right: "15%",
//                   width: "90px",
//                   height: "90px",
//                   background: "rgba(255, 193, 7, 0.2)",
//                   borderRadius: "50%",
//                   filter: "blur(18px)",
//                   animation: "float 7s ease-in-out infinite",
//                 }}
//               ></div>
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: "15%",
//                   left: "10%",
//                   width: "70px",
//                   height: "70px",
//                   background: "rgba(255, 255, 255, 0.15)",
//                   borderRadius: "50%",
//                   filter: "blur(12px)",
//                   animation: "pulse 3s ease-in-out infinite",
//                 }}
//               ></div>

//               {/* Overlay for better text readability */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   bottom: 0,
//                   background: "rgba(0,0,0,0.3)",
//                   pointerEvents: "none",
//                 }}
//               ></div>

//               <div className="container h-100">
//                 <div className="row align-items-center w-100 h-100">
//                   <div className="col-lg-7">
//                     <div className="mb-4">
//                       <span className="badge bg-light  fs-6 px-3 py-2 rounded-pill">
//                         <i className="bi bi-chef-hat me-2"></i>Chef's Special
//                       </span>
//                     </div>
//                     <h1 className="display-2 fw-bold mb-4 text-white">
//                       Culinary
//                       <span className="d-block text-warning fst-italic">
//                         Excellence
//                       </span>
//                     </h1>
//                     <p className="lead mb-4 text-white fs-4">
//                       Discover our signature dishes crafted by master chefs with
//                       years of experience.
//                       <span className="text-warning fw-semibold">
//                         Each dish tells a story
//                       </span>{" "}
//                       of passion and tradition.
//                     </p>

//                     {/* Feature highlights */}
//                     <div className="row mb-4">
//                       <div className="col-md-6 mb-2">
//                         <div className="d-flex align-items-center">
//                           <i className="bi bi-chef-hat-fill text-warning me-2"></i>
//                           <small className="text-white-50">
//                             Master Chef Prepared
//                           </small>
//                         </div>
//                       </div>
//                       <div className="col-md-6 mb-2">
//                         <div className="d-flex align-items-center">
//                           <i className="bi bi-heart-fill text-warning me-2"></i>
//                           <small className="text-white-50">
//                             Made with Passion
//                           </small>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="d-flex gap-3 flex-wrap">
//                       <a
//                         href="#menu"
//                         className="btn btn-light btn-lg rounded-pill px-5 py-3  fw-bold shadow-lg"
//                         style={{
//                           background:
//                             "linear-gradient(45deg, #ffffff, #f8f9fa)",
//                           border: "none",
//                           transition: "all 0.3s ease",
//                         }}
//                       >
//                         <i className="bi bi-chef-hat me-2"></i>Try Our Specials
//                       </a>
//                     </div>
//                   </div>

//                   <div className="col-lg-5 d-none d-lg-block text-center">
//                     <div className="position-relative">
//                       {/* Main feature card */}
//                       <div
//                         className="card bg-gradient shadow-lg border-0"
//                         style={{
//                           background: "rgba(255, 255, 255, 0.1)",
//                           backdropFilter: "blur(10px)",
//                           border: "1px solid rgba(255, 255, 255, 0.2)",
//                         }}
//                       >
//                         <div className="card-body p-5 text-center">
//                           <div className="mb-4">
//                             <i className="bi bi-chef-hat display-1 text-warning"></i>
//                           </div>
//                           <h3 className="text-white mb-3">Expert Chefs</h3>
//                           <p className="text-white-50 mb-4">
//                             Our skilled chefs bring years of culinary expertise
//                             to every dish
//                           </p>
//                           <div className="row text-center">
//                             <div className="col-6">
//                               <div className="border-end border-light border-opacity-25">
//                                 <h4 className="text-warning mb-0">20+</h4>
//                                 <small className="text-white-50">
//                                   Specialties
//                                 </small>
//                               </div>
//                             </div>
//                             <div className="col-6">
//                               <h4 className="text-warning mb-0">♨</h4>
//                               <small className="text-white-50">
//                                 Served Hot
//                               </small>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <button
//           className="carousel-control-prev"
//           type="button"
//           data-bs-target="#heroCarousel"
//           data-bs-slide="prev"
//         >
//           <span
//             className="carousel-control-prev-icon"
//             aria-hidden="true"
//           ></span>
//           <span className="visually-hidden">Previous</span>
//         </button>
//         <button
//           className="carousel-control-next"
//           type="button"
//           data-bs-target="#heroCarousel"
//           data-bs-slide="next"
//         >
//           <span
//             className="carousel-control-next-icon"
//             aria-hidden="true"
//           ></span>
//           <span className="visually-hidden">Next</span>
//         </button>
//       </div>
//     </>
//   );
// }

// export default Carousel;