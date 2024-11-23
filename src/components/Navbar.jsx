import React, { useState } from "react";
import { Search, Notification } from "@carbon/icons-react";
import "../styles/Navbar.css"; // Import the updated CSS
import { useSelector } from "react-redux";

const Navbar = () => {
const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="navbar">
      {/* Logo Section */}
      <div className="navbar__logo">Starship App</div>

      {/* Navbar Links (Desktop) */}
      <div className="navbar__links">
        <a href="#starships" className="navbar__link">
          Starships
        </a>
        <a href="#planets" className="navbar__link">
          Planets
        </a>
        <a href="#characters" className="navbar__link">
          Characters
        </a>
      </div>

      {/* Navbar Actions (Icons: Search & Notification) */}
      <div className="navbar__actions">
        <button className="navbar__action" onClick={() => alert("Search clicked!")}>
          <Search size={20} />
        </button>
        <button className="navbar__action" onClick={() => alert("Notifications clicked!")}>
          <Notification size={20} />
        </button>
      </div>
      <div className="navbar__actions">
        <span>🛒 Cart: {totalQuantity} items</span>
      </div>

      {/* Mobile Menu Button */}
      <button className="mobile-menu-button" onClick={toggleMobileMenu}>
        ☰
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
            <ol>
            <a href="#starships" className="navbar__link">
            Starships
            </a>
            </ol>
            <ol>
            <a href="#planets" className="navbar__link">
                Planets
            </a>
            </ol>
            <ol>
            <a href="#characters" className="navbar__link">
            Characters
            </a>
            </ol>
        </div>
      )}
    </div>
  );
};

export default Navbar;
