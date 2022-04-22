import React from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../../store/auth/authSlice";

import { IContract } from "../../../store/contracts/contractsSlice";

import "./_contract.scss";

const Contract: React.FunctionComponent<IContract> = ({
  icon,
  name,
  reference,
}) => {
  const { currentUser } = useSelector(authSelector);

  return (
    <div className="card contract_card">
      <img className="icon_insurance" src={icon} alt="icon_insurance" />
      <h2 className="heading-m secondary-color">{name}</h2>
      {currentUser?.role !== "admin" ? (
        <span className="body-s error-color underline">
          En attente de souscription
        </span>
      ) : null}

      <button
        className={`btn--squared ${
          currentUser?.role !== "admin"
            ? "btn--squared-danger"
            : "btn--squared-primary"
        }`}
      >
        Voir le contrat
      </button>
    </div>
  );
};

export default Contract;
