import ChartsBox from "@/components/ChartsBox";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import LastTransactionsWidget from "@/components/LastTransactionsWidget";
import React from "react";
import DynamicChart from "@/components/DynamicChart";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Adjusted container for consistent height */}
          
          <div className="lasttransactions h-full flex flex-col">
            
            <LastTransactionsWidget />
          </div>
          <div className="totalbalancebox h-full flex flex-col justify-between">
            
            <div className="incomechart">
              <DynamicChart
                type="line"
                data={[200, 400, 300, 500, 700]}
                labels={["Jan", "Feb", "Mar", "Apr", "May"]}
                title="Account Balance Over Time"
              />
            </div>
          </div>
        </div>

        <ChartsBox />
      </header>
    </div>
  );
};

export default Home;
