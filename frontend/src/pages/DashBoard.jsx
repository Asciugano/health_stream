import React from "react";
import HealthChart from "../components/HealthChart.jsx";
import HealthList from "../components/HealthList.jsx";

function DashBoard({ metrics }) {
  {/* <div className="flex justify-center min-h-[calc(100vh-64px)] pt-20 items-start"> */ }
  return (
    <div>
      <HealthChart metrics={metrics} />
      <HealthList metrics={metrics} />
    </div >
  )
}

export default DashBoard;
