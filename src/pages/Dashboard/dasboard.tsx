import React from "react";
import ContractsList from "../../components/molecules/ContractsList/contractsList";

import "./_dashboard.scss";

function Dashboard() {
  return (
    <div className="container_responsive">
      <div className="container_dashboard">
        <h1 className="heading-l secondary-color">Tous les contrats</h1>
        <hr className="bg-primary" />
        <ContractsList />
      </div>
    </div>
  );
}

export default Dashboard;
