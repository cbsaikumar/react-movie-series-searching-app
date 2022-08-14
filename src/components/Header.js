import React from "react";
import "./Header.css";

function Header() {
  return (
    <div onClick={() => window.scrollTo(0, 0)} className="header">
      🎬 Entertainment Hub 🎥
    </div>
  );
}

export default Header;
