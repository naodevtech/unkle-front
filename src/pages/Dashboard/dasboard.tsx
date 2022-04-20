import React from "react";
import ContractList from "../../components/molecules/ContractList/contractList";

import "./_dashboard.scss";

function Dashboard() {
  return (
    <div className="container_responsive">
      <div className="container_dashboard">
        <h1 className="heading-l secondary-color">Tous les contrats</h1>
        <hr className="bg-primary" />
        <ContractList />
      </div>
    </div>
  );
}

export default Dashboard;
