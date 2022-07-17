import React from "react";
import "./App.css";
import { connect } from "react-redux";
import CommonDisplay from "./CommonDisplay";

function AppFn(props) {
  const { count, dispatch } = props;
  return (
    <div>
      <CommonDisplay count={count} dispatch={dispatch} />
    </div>
  );
}

class AppClass extends React.Component {
  render() {
    const { count, dispatch } = this.props;
    return (
      <div>
        <CommonDisplay count={count} dispatch={dispatch} />
      </div>
    );
  }
}

function mapStateToPropsForBoth(state) {
  return { count: state.count };
}

const ConnectedAppFn = connect(mapStateToPropsForBoth)(AppFn);
const ConnectedAppClass = connect(mapStateToPropsForBoth)(AppClass);

export { ConnectedAppFn, ConnectedAppClass };
