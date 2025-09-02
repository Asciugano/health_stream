import React from "react";
import SingupComponent from "../components/SingupComponent";

function SingupPage({ setToken }) {
  return (
    <div className="flex justify-center min-h-[calc(100vh-64px)] pt-20 items-start">
      <SingupComponent onSingup={setToken} />
    </div>
  );
}

export default SingupPage;
