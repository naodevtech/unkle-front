import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import api from "../../utils/api";

import {
  setContractsFailed,
  setContractSuccess,
} from "../../store/contracts/contractsSlice";
import {
  contractsSelector,
  IOption,
} from "../../store/contracts/contractsSlice";

import Alert from "../../components/atoms/Alert/alert";

import dateIcon from "../../assets/iconography/date.svg";
import optionIcon from "../../assets/iconography/option.svg";

import "./_contractDetails.scss";
import Option from "../../components/atoms/Option/option";

function ContractDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { error, contract } = useSelector(contractsSelector);

  useEffect(() => {
    const getContractById = async () => {
      try {
        const contract = await api.get(`/contracts/${id}`);
        dispatch(setContractSuccess(contract.data.data));
      } catch (error: any) {
        dispatch(setContractsFailed(error.response.data.message));
      }
    };
    getContractById();
  }, [id, dispatch]);

  return (
    <div className="container_responsive">
      <div className="container_contract_details">
        {error ? (
          <div className="box_alert">
            <Alert type={"error"} message={error} />
          </div>
        ) : (
          <>
            <div className="contract_heading">
              <div className="container_info">
                <h1 className="heading-l secondary-color">
                  {contract.reference}
                </h1>
                <hr className="bg-primary" />
                <div className="box_contract_infos">
                  <div className="box_contract_sub_infos">
                    <img src={contract.icon} alt="contract_icon" />
                    <h2 className="heading-m">{contract.name}</h2>
                  </div>
                  <div className="box_contract_sub_infos">
                    <img src={dateIcon} alt="date_icon" />
                    <h2 className="heading-m">21/02/2021 - 21/02/2022</h2>
                  </div>
                  <div className="box_description">
                    <p className="body-l">{contract.description}</p>
                  </div>
                </div>
              </div>
              <div className="box_call_to_actions">
                <button className="btn btn--squared btn--squared-primary">
                  Consulter les clients
                </button>
                <button className="btn btn--squared btn--squared-success">
                  Assigner le contrat
                </button>
                <button className="btn btn--squared btn--squared-warning">
                  Resilier le contract
                </button>
                <button className="btn btn--squared btn--squared-danger">
                  Supprimer le contract
                </button>
              </div>
            </div>
            <div className="container_options">
              <div className="options_heading">
                <img src={optionIcon} alt="option_icon" />
                <h2 className="heading-m">Options</h2>
              </div>
              {contract
                ? contract.ContractOptions?.map(
                    (option: IOption, index: number) => {
                      return (
                        <Option
                          key={index}
                          name={option.name}
                          description={option.description}
                        />
                      );
                    }
                  )
                : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ContractDetails;
