import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";

export default function Login(props) {
  const [state, setState] = useState({
    username: "",
    password: "",
    password2: "",
    isRegistering: false,
    registrationErrors: []
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

  const register = async ev => {
    ev.preventDefault();
    //clear previous errors listed
    setState({ ...state, registrationErrors: [] });

    let registrationInfo = {
      username: state.username,
      password1: state.password,
      password2: state.password2
    };

    let responseRaw = await fetch("http://localhost:8000/api/registration/", {
      method: "post",
      body: JSON.stringify(registrationInfo),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let response = await responseRaw.json();

    if (responseRaw.status === 201) {
      props.logIn(response.key);
    } else {
      buildErrorMessages(response);
    }
  };

  const login = async ev => {
    ev.preventDefault();
    //clear previously listed errors
    setState({ ...state, registrationErrors: [] });

    let loginInfo = {
      username: state.username,
      password: state.password
    };

    let responseRaw = await fetch("http://localhost:8000/api/login/", {
      method: "post",
      body: JSON.stringify(loginInfo),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let response = await responseRaw.json();

    if (responseRaw.status === 200) {
      props.logIn(response.key);
    } else {
      buildErrorMessages(response);
    }
  };

  function buildErrorMessages(response) {
    const errorsToAdd = [];
    if (response.username) {
      // if username is taken - response.username[0] = "A user with that username alreadey exists"
      errorsToAdd.push(...response.username);
    }
    if (response.password1) {
      // if password is of bad form - response.password1 = [array of string errors]
      errorsToAdd.push(...response.password1);
    }
    if (response.non_field_errors) {
      // if passwords dont match - response.non_field_errors[0] = "The two password fields didn't match"
      errorsToAdd.push(...response.non_field_errors);
    }
    setState({ ...state, registrationErrors: errorsToAdd });
  }

  return (
    <Form onSubmit={state.isRegistering ? register : login}>
      <h1>
        {state.isRegistering ? "Register Your Account" : "Login to Continue"}
      </h1>

      <Form.Control
        name="username"
        placeholder="username"
        onChange={handleChange}
        value={state.username}
      />
      <Form.Control
        name="password"
        type="password"
        placeholder="password"
        onChange={handleChange}
        value={state.password}
      />
      {/* Second password field for registration */}
      {state.isRegistering ? (
        <Form.Control
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

      {/* list of errors for login or registration failure */}
      {state.registrationErrors.map(error => (
        <Alert key={error} variant={"danger"}>
          {error}
        </Alert>
      ))}
    </Form>
  );
}
