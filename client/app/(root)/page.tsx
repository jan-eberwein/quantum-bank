import ChartsBox from "@/components/ChartsBox";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const Home = () => {
  const loggedIn = { firstName: "Jan", lastName: "Eberwein" };

  return (
    <div className="home-content">
      <header className="home-header">
        <HeaderBox
          type="greeting"
          title="Welcome"
          user={loggedIn?.firstName || "User"}
          subtext="Dashboard"
        />

        <TotalBalanceBox balance={"10000.00"} />

        <ChartsBox />

        <p>AI-powered banking application</p>
      </header>
    </div>
  );
};

export default Home;
