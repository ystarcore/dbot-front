import React from "react";
import Team from "../team";

function Dash() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: 'url("back.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Team />
    </div>
  );
}

export default Dash;
