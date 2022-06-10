import "../AppWideCSS.css";
import React, { useState } from "react";
import About from "./About";
import Contact from "./Contact";
import Privacy from "./Privacy";
import img1 from "../livekindly.gif";
import img2 from "../livekindly.jpg";

const Home = (props) => {
  const [tosAgreed, setTosAgreed] = useState(false);
  const [url, setUrl] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [finalOutput, setfinalOutput] = useState("");
  const [isError, setIsError] = useState(false);

  function tosHandler() {
    if (!tosAgreed) {
      setShowWarning(false);
    }
    setTosAgreed((prevState) => !prevState);
  }
  function handleUrlInput(event) {
    setUrl(event.target.value);
  }
  function showCautionMsg() {
    if (tosAgreed) {
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
    setfinalOutput("");

    if (tosAgreed) {
      setIsError(false);
      const sendShortenURLRequest = async function () {
        try {
          const response = await fetch(
            `https://api.shrtco.de/v2/shorten?url=${url}`,
            {
              method: "POST",
            }
          );
          console.log(response.ok);

          const json = await response.json();
          return json;
        } catch (err) {
          setfinalOutput(`Error! ${err.message}`);
          setIsError(true);
        }
      };

      sendShortenURLRequest().then((data) => {
        console.log(data);
        if (data.ok) {
          setfinalOutput(`https://shrtco.de/${data.result.code}`);
        } else {
          setfinalOutput(data.error);
          setIsError(true);
        }
      });
    } else {
      console.log("You MUST Agree to TOS");
      setShowWarning(true);
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(finalOutput);
  };
  return (
    <div className="home">
      <h2>My friend... It's time to "Go Vegan"</h2>
      <p>You can shorten URLs only if you agree to "Go Vegan"</p>
      <p>
        I accept the{" "}
        <span
          className="toslink"
          onClick={() => {
            props.choosePage("Vegan Policy");
          }}
        >
          Go Vegan
        </span>{" "}
        Policy
        <input type="checkbox" onChange={tosHandler} checked={tosAgreed} />{" "}
        &nbsp;
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="start with http(s)://"
          value={url}
          onChange={handleUrlInput}
          required
        />
        <button
          type="submit"
          className="button-styled"
          onMouseOver={showCautionMsg}
          onMouseOut={showCautionMsg}
        >
          Shorten!
        </button>
      </form>
      <div className="output-zone">
        <p className={isError ? "show" : "hide"}>
          <span className="errormsg">{finalOutput}</span>
        </p>
        <p
          className={
            !isError && finalOutput.length !== 0
              ? "show successmsg"
              : "hide successmsg"
          }
        >
          Short URL : &nbsp;
          <a href={finalOutput} target="_blank" rel="noreferrer">
            {finalOutput}
          </a>
          <button className="button-styled" onClick={handleCopy}>
            Copy
          </button>
          <br />
          <img
            src={Math.random() < 0.5 ? img1 : img2}
            alt="advantages of being vegan"
          ></img>
        </p>
        <p className={showWarning ? "show" : "hide"}>
          <span className="errormsg">
            You MUST accept our "Go Vegan Policy" !
          </span>
        </p>
      </div>
    </div>
  );
};

const Body = (props) => {
  console.log(props);
  let DisplayedPage = <p>Loading...</p>;
  if (props.page === "Home" || props.page === "FatCow Link Shortener") {
    DisplayedPage = <Home choosePage={props.choosePage} />;
  } else if (props.page === "About Us") {
    DisplayedPage = <About />;
  } else if (props.page === "Vegan Policy") {
    DisplayedPage = <Privacy />;
  } else if (props.page === "Contact Us") {
    DisplayedPage = <Contact />;
  } else {
    DisplayedPage = <p>Not Found 404 </p>;
  }
  return (
    <React.Fragment>
      <div className="body">{DisplayedPage}</div>
    </React.Fragment>
  );
};

export default Body;
