import React from "react";
import { connect } from "react-redux";

// Note: Styles in index.css are applied here too.
// Reason: styles in normal css files are not scoped.
// So they are applied here too...

// ACTION CREATOR function
const flipLight = () => {
  return { type: "TOGGLE_LIGHT" };
};

//callback to connect fn of "redux-react"
const mapStateToPropsRoom = (state) => {
  return { isLightOn: state.isLightOn };
};

class Room extends React.Component {
  render() {
    // state is received as props... in Room Component after using connect()()
    // console.log(this.props);
    const lightedness = this.props.isLightOn ? "lit" : "dark";
    const { dispatch } = this.props;
    return (
      <div className={`room ${lightedness}`}>
        the room is {lightedness}
        <br />
        <button
          onClick={() => {
            dispatch(flipLight());
          }}
        >
          flip
        </button>
      </div>
    );
  }
}
const ConnectedRoom = connect(mapStateToPropsRoom)(Room);

export default ConnectedRoom;
