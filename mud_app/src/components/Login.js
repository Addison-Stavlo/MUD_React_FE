import React, { useState } from "react";
import { Alert, Form, Button } from "react-bootstrap";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import styled from "styled-components";

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
      isRegistering: !state.isRegistering,
      registrationErrors: []
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
    <FormHolder>
      <StyledForm onSubmit={state.isRegistering ? register : login}>
        <h1>
          {state.isRegistering ? "Register Your Account" : "Login to Continue"}
        </h1>
        <Form.Label>Username</Form.Label>
        <Form.Control
          name="username"
          placeholder="username"
          onChange={handleChange}
          value={state.username}
        />
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="password"
          onChange={handleChange}
          value={state.password}
        />
        {/* Second password field for registration */}
        {state.isRegistering ? (
          <>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name="password2"
              type="password"
              placeholder="confirm password"
              onChange={handleChange}
              value={state.password2}
            />
          </>
        ) : null}

        <Button variant="primary" type="submit">
          {state.isRegistering ? "Register" : "Log-In"}
        </Button>
        <Button variant="outline-primary" onClick={toggleRegistering}>
          {state.isRegistering ? "Already Signed Up?" : "Need to Sign Up?"}
        </Button>

        {/* list of errors for login or registration failure */}
        {state.registrationErrors.map(error => (
          <Alert key={error} variant={"danger"}>
            {error}
          </Alert>
        ))}
      </StyledForm>
    </FormHolder>
  );
}

const StyledForm = styled.form`
  background: white;
  color: black;
  margin: 20px auto;
  min-width: 300px;
  width: 90vw;
  max-width: 500px;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px 0 lightgray;
  z-index: 10;

  button {
    margin: 20px 10px 0;
  }
  .form-label {
    margin-bottom: 0;
  }
  input {
    margin-bottom: 5px;
  }
`;

const FormHolder = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(50, 50, 50, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
`;
