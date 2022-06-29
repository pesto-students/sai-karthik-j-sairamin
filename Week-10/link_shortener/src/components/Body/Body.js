import React from "react";
import { About, Contact, Home, Privacy } from "..";

const Body = ({ page, choosePage }) => {
  let renderedContent = <p>Loading...</p>;
  if (page === "Home" || page === "FatCow Link Shortener") {
    renderedContent = <Home choosePage={choosePage} />;
  } else if (page === "About Us") {
    renderedContent = <About />;
  } else if (page === "Vegan Policy") {
    renderedContent = <Privacy />;
  } else if (page === "Contact Us") {
    renderedContent = <Contact />;
  } else {
    renderedContent = <p>Not Found 404 </p>;
  }
  return (
    <React.Fragment>
      <div className="body">{renderedContent}</div>
    </React.Fragment>
  );
};

export default Body;
