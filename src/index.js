import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import Nav from "./Nav";
import Users from "./Users";
import Things from "./Things";
import Home from "./Home";
import store from "./store";
import { Provider, connect } from "react-redux";
import { getData } from "./store";

const root = createRoot(document.querySelector("#app"));

class _App extends Component {
  async componentDidMount() {
    window.addEventListener("hashchange", () => {
      this.props.setView(window.location.hash.slice(1));
    });
    try {
      this.props.loadData();
    } catch (ex) {
      console.log(ex);
    }
  }
  render() {
    const { view } = this.props;
    return (
      <div>
        <Nav />
        {view === "" ? <Home /> : null}
        {view === "users" ? <Users /> : null}
        {view === "things" ? <Things /> : null}
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    setView: (view) => {
      dispatch({ type: "SET_VIEW", view });
    },
    loadData: async () => {
      dispatch(getData());
    },
  };
};
const mapStateToProps = (state) => {
  return {
    view: state.view,
  };
};

const App = connect(mapStateToProps, mapDispatch)(_App);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
