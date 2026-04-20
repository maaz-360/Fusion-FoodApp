import React from 'react'
import { useSelector } from 'react-redux';

function Footer() {
  const theme = useSelector((state) => state.theme.mode);

  const getThemeStyles = () => {
    if (theme === "dark") {
      return {  background: `radial-gradient(ellipse at 30% 80%, #003322 0%, #000d0a 50%, #000000 100%)`};
    }
    return { background: `linear-gradient(135deg, #a8edea 0%, #fed6e3 25%, #d299c2 50%, #fef9d7 75%, #a8edea 100%)` };
  };

  return (
    <footer className="mt-auto py-3 bg-body-tertiary border-top" style={getThemeStyles()}>
      <div className="container small text-muted flex-sm-row text-center ">
        <span>
          Crafted with <i className="bi bi-heart-fill text-primary"></i> by
          Maaz
        </span>
      </div>
    </footer>
  
  )
}

export default Footer