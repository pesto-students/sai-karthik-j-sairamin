import React from "react";

const Footer = ({ choosePage }) => {
  return (
    <React.Fragment>
      <div className="footer">
        <p>
          Feel free to contact us if you have any query.
          <br />
          By using our URL shortening service, you automatically agree to our
          &nbsp;
          <span
            className="footerlink"
            onClick={() => {
              choosePage("Vegan Policy");
            }}
          >
            Go Vegan Policy
          </span>
          <br />
          <span>&#169; {new Date().getFullYear()} All rights reserved. </span>
        </p>

        <p>
          <i className="fa-brands fa-facebook fa-2x"></i>
          <i className="fa-brands fa-twitter fa-2x"></i>
          <i className="fa-brands fa-whatsapp fa-2x"></i>
        </p>
      </div>
    </React.Fragment>
  );
};

export default Footer;
