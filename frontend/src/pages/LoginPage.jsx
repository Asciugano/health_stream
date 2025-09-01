import React from "react";
import LoginComponent from "../components/LoginComponent";

function LoginPage({ token, setToken }) {
  return (
    <LoginComponent onLogin={setToken} />
  )
}

export default LoginPage;
