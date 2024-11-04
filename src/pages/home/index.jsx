import React from "react";

import Scrape from "./../scrape";

const Home = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: 'url("back.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div style={{ padding: "100px 40px" }}>
        <Scrape />
      </div>
    </div>
  );
};

export default Home;
