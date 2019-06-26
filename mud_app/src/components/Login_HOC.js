import React from "react";
import Login from "./Login";

export default function Login_HOC(Component) {
  return class extends React.Component {
    state = {
      isLoggedIn: false
    };

    render() {
      if (this.state.isLoggedIn) {
        return <Component />;
      } else {
        return <Login />;
      }
    }
  };
}
