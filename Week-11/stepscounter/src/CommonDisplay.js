import React from "react";

function resetActionCreator() {
  return { type: "RESET" };
}
function incrementActionCreator() {
  return { type: "INCREMENT" };
}

const CommonDisplay = (props) => {
  const { count, dispatch } = props;
  console.log(count);

  const handleIncrement = () => {
    dispatch(incrementActionCreator());
  };

  const handleReset = () => {
    dispatch(resetActionCreator());
  };
  return (
    <div className="commonDisplay">
      <h2>You've walked {count} steps today!</h2>
      <button className="btn-color" onClick={handleIncrement}>
        Add Step
      </button>
      <button className="btn-normal" onClick={handleReset}>
        Reset Steps
      </button>
    </div>
  );
};

export default CommonDisplay;
