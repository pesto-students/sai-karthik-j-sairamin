import React from "react";

const Header = ({ choosePage }) => {
  function handleClick(event) {
    choosePage(event.target.innerText);
  }
  return (
    <React.Fragment>
      <div className="header">
        <div className="logo">
          <div
            className="logo-text"
            onClick={() => {
              choosePage("Home");
            }}
          >
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

export { Header };
