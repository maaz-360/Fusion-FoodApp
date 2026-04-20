import AppRouter from "./routes/AppRouter"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import { ToastContainer } from "react-toastify"
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function App() {

  const theme = useSelector((state) => state.theme.mode)


  const getThemeStyles = () => {
    if (theme === "dark") {
      return {
        background: `radial-gradient(ellipse at 30% 80%, #003322 0%, #000d0a 50%, #000000 100%)`,
      };
    } else {
      return {
        background: `linear-gradient(135deg, #a8edea 0%, #fed6e3 25%, #d299c2 50%, #fef9d7 75%, #a8edea 100%)`,
      };
    }
  };

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", theme);
    
  }, [theme]);


  return (
    <div className="d-flex flex-column min-vh-100 bg-body" style={getThemeStyles()}>
      <Header />
      <main className="flex-grow-1">
        <AppRouter />
      </main>
      <Footer />
      <ToastContainer />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default App
