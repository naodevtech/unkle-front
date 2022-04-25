import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import api from "../../utils/api";

import {
  setContractsFailed,
  setContractSuccess,
} from "../../store/contracts/contractsSlice";
import { contractsSelector } from "../../store/contracts/contractsSlice";

import dateIcon from "../../assets/iconography/date.svg";
import optionIcon from "../../assets/iconography/option.svg";

import "./_contractDetails.scss";
import { authSelector } from "../../store/auth/authSlice";
import { OptionsList } from "../../components/molecules/OptionsList/optionsList";

function ContractDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(authSelector);
  const { contract } = useSelector(contractsSelector);

  useEffect(() => {
    const getContractById = async () => {
      try {
        const contract = await api.get(`/contracts/${id}`);
        dispatch(setContractSuccess(contract.data.data));
      } catch (error: any) {
        dispatch(setContractsFailed(error.response.data.message));
      }
    };
    const getContractClientById = async (userId: string | undefined) => {
      try {
        const userContract = await api.get(`/userContracts/${userId}/${id}`);
        dispatch(setContractSuccess(userContract.data.data));
      } catch (error: any) {
        dispatch(setContractsFailed(error.response.data.message));
      }
    };
    const getContractsByUser = async () => {
      if (currentUser?.role === "admin") {
        return await getContractById();
      }
      getContractClientById(currentUser?.id);
    };
    getContractsByUser();
  }, [currentUser, dispatch, id]);

  return (
    <div className="container_responsive">
      <div className="container_contract_details">
        <div className="contract_heading">
          <div className="container_info">
            <h1 className="heading-l secondary-color">{contract.reference}</h1>
            <hr className="bg-primary" />
            <div className="box_contract_infos">
              <div className="box_contract_sub_infos">
                <img src={contract.icon} alt="contract_icon" />
                <h2 className="heading-m">{contract.name}</h2>
              </div>
              {currentUser?.role !== "admin" ? (
                <div className="box_contract_sub_infos">
                  <img src={dateIcon} alt="date_icon" />
                  <h2 className="heading-m">
                    {contract.beginingDate} - {contract.endDate}
                  </h2>
                </div>
              ) : null}
              <div className="box_description">
                <p className="body-l">{contract.description}</p>
              </div>
            </div>
          </div>
          <div className="box_call_to_actions">
            {currentUser?.role === "admin" ? (
              <>
                <button className="btn btn--squared btn--squared-primary">
                  Consulter les clients
                </button>
                <button className="btn btn--squared btn--squared-success">
                  Assigner le contrat
                </button>

                <button className="btn btn--squared btn--squared-danger">
                  Supprimer le contrat
                </button>
              </>
            ) : (
              <button className="btn btn--squared btn--squared-warning">
                souscrire au contrat
              </button>
            )}
          </div>
        </div>
        <div className="container_options">
          <div className="options_heading">
            <img src={optionIcon} alt="option_icon" />
            <h2 className="heading-m">Options</h2>
          </div>
          {contract ? (
            <OptionsList contractOptions={contract.ContractOptions} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ContractDetails;

//  {
//    contract
//      ? contract.ContractOptions?.map((option: IOption, index: number) => {
//          return (
//            <Option
//              key={index}
//              name={option.name}
//              description={option.description}
//            />
//          );
//        })
//      : null;
//  }
