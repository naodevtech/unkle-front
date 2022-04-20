import React from "react";

import { IContract } from "../../../store/contracts/contractsSlice";

import "./_contract.scss";

const Contract: React.FunctionComponent<IContract> = ({ icon, name }) => {
  return (
    <div className="card contract_card">
      <img className="icon_insurance" src={icon} alt="icon_insurance" />
      <h2 className="heading-m primary-color">{name}</h2>
      <span className="body-s error-color underline">
        En attente de souscription
      </span>
      <button className="btn--squared btn--squared-danger">
        Voir le contrat
      </button>
    </div>
  );
};

export default Contract;
