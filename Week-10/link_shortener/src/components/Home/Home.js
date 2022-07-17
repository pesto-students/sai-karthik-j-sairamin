import React, { useState } from "react";
import { loadingImage, warningImage } from "../../images";

const Home = ({ choosePage }) => {
  const [finalOutput, setfinalOutput] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [tosAgreed, setTosAgreed] = useState(false);
  const [url, setUrl] = useState("");

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

  function hideCautionMsg() {
    setShowWarning(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (tosAgreed) {
      setfinalOutput("");
      setIsError(false);
      setIsLoading(true);
      const sendShortenURLRequest = async function () {
        try {
          const response = await fetch(
            `https://api.shrtco.de/v2/shorten?url=${url}`,
            {
              method: "POST",
            }
          );

          const json = await response.json();
          return json;
        } catch (err) {
          // handles errors when no internet
          setfinalOutput(`Error! ${err.message}`);
          setIsError(true);
          setIsLoading(false);
        }
      };

      sendShortenURLRequest().then((data) => {
        if (data.ok) {
          setfinalOutput(`https://shrtco.de/${data.result.code}`);
        } else {
          // successful connection but errors
          setfinalOutput(data.error);
          setIsError(true);
        }
        setIsLoading(false);
      });
    } else {
      //   console.log("You MUST Agree to TOS");
      setShowWarning(true);
    }
  }

  // This copies the finalOutput to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(finalOutput);
  };
  return (
    <div className="home">
      <h2>My friend... It's time to "Go Vegan"</h2>
      <p>You can shorten URLs only if you agree to "Go Vegan"</p>
      <p>
        I have no choice. 😈 So I accept{" "}
        <span
          className="toslink"
          onClick={() => {
            choosePage("Vegan Policy");
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
          onMouseOut={hideCautionMsg}
        >
          Shorten!
        </button>
      </form>
      <div className="output-zone">
        {isLoading && (
          <p>
            <img className="loadingimage" src={loadingImage} alt="loading..." />
          </p>
        )}

        <p className={isError ? "show" : "hide"}>
          <span className="errormsg">{finalOutput}</span>
        </p>
        <p
          className={
            !isError && !showWarning && finalOutput.length !== 0
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
        </p>
        <p className={showWarning ? "show" : "hide"}>
          <span className="errormsg">
            You MUST accept our "Go Vegan Policy" !
          </span>
          <img src={warningImage} alt="angry vegan cow"></img>
        </p>
      </div>
    </div>
  );
};

export { Home };
