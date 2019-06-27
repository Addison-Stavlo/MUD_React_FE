import React from "react";
import Login from "./Login";

export default function Login_HOC(Component) {
  return class extends React.Component {
    state = {
      isLoggedIn: false
    };

    componentDidMount() {
      //currently using infinite duration token, no need to check expiration
      // token => loggedIn
      if (localStorage.getItem("token")) {
        this.setState({ isLoggedIn: true });
      }
    }

    logIn = key => {
      this.setState({ isLoggedIn: true });
      localStorage.setItem("token", key);
    };

    logOut = () => {
      this.setState({ isLoggedIn: false });
      localStorage.removeItem("token");
    };

    render() {
      if (this.state.isLoggedIn) {
        return <Component logOut={this.logOut} />;
      } else {
        return <Login logIn={this.logIn} />;
      }
    }
  };
}
