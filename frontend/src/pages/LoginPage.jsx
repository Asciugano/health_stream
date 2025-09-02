import React from "react";
import LoginComponent from "../components/LoginComponent";

function LoginPage({ setToken }) {
  return (
    <div className="flex justify-center min-h-[calc(100vh-64px)] pt-20 items-start">
      <LoginComponent onLogin={setToken} />
    </div>
  )
}

export default LoginPage;
