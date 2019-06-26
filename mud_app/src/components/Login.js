import React, { useState } from "react";

export default function Login() {
  const [state, setState] = useState({
    username: "",
    password: "",
    password2: "",
    isRegistering: false,
    passwordsMatch: false,
    passwordError: false
  });

  const handleChange = ev => {
    setState({
      ...state,
      [ev.target.name]: ev.target.value
    });
  };

  const toggleRegistering = ev => {
    ev.preventDefault();
    setState({
      ...state,
      isRegistering: !state.isRegistering
    });
  };

  function checkPasswords() {
    if (state.password === state.password2) {
      setState({ ...state, passwordsMatch: true, passwordError: false });
      return true;
    } else {
      setState({ ...state, passwordError: true });
      return false;
    }
  }

  const register = async ev => {
    ev.preventDefault();
    if (checkPasswords()) {
      let info = {
        username: state.username,
        password1: state.password,
        password2: state.password2
      };

      let responseRaw = await fetch("http://localhost:8000/api/registration/", {
        method: "post",
        body: JSON.stringify(info),
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(responseRaw);
      let response = await responseRaw.json();
      console.log(response);
    }
  };

  const login = ev => {
    ev.preventDefault();
  };

  return (
    <form onSubmit={state.isRegistering ? register : login}>
      <h1>
        {state.isRegistering ? "Register Your Account" : "Login to Continue"}
      </h1>

      <input
        name="username"
        placeholder="username"
        onChange={handleChange}
        value={state.username}
      />
      <input
        name="password"
        type="password"
        placeholder="password"
        onChange={handleChange}
        value={state.password}
      />
      {/* Second password field for registration */}
      {state.isRegistering ? (
        <input
          name="password2"
          type="password"
          placeholder="confirm password"
          onChange={handleChange}
          value={state.password2}
        />
      ) : null}

      <button type="submit">
        {state.isRegistering ? "Register" : "Log-In"}
      </button>
      <button onClick={toggleRegistering}>
        {state.isRegistering ? "Already Signed Up?" : "Need to Sign Up?"}
      </button>
      {state.passwordError ? "Passwords Do Not Match" : null}
    </form>
  );
}
