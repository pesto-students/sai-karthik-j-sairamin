import "../AppWideCSS.css";
import React from "react";

const Header = (props) => {
  function handleClick(event) {
    props.choosePage(event.target.innerText);
  }
  return (
    <React.Fragment>
      <div className="header">
        <div className="logo">
          <div className="logo-text" onClick={handleClick}>
            Go Vegan Link Shortener
          </div>
        </div>
        <div className="menu">
          <ul>
            <li onClick={handleClick}>Home</li>
            <li onClick={handleClick}>About Us</li>
            <li onClick={handleClick}>Vegan Policy</li>
            <li onClick={handleClick}>Contact Us</li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
