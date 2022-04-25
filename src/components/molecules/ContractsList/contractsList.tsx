import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authSelector } from "../../../store/auth/authSlice";
import {
  contractsSelector,
  setContractsFailed,
  setContractsSuccess,
} from "../../../store/contracts/contractsSlice";

import api from "../../../utils/api";
import Alert from "../../atoms/Alert/alert";

import Contract from "../../atoms/Contract/contract";

import "./_contractsList.scss";

function ContractsList() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(authSelector);
  const { contracts } = useSelector(contractsSelector);

  useEffect(() => {
    const getAllContracts = async () => {
      try {
        const contractsFetched = await api.get("/contracts");
        dispatch(setContractsSuccess(contractsFetched.data.data));
      } catch (error: any) {
        dispatch(setContractsFailed(error.response.data.message));
      }
    };
    const getAllContractsClient = async (userId: string | undefined) => {
      try {
        const contractsFetched = await api.get(`/userContracts/${userId}`);
        dispatch(setContractsSuccess(contractsFetched.data.data));
      } catch (error: any) {
        dispatch(setContractsFailed(error.response.data.message));
      }
    };
    const getContractsByUser = async () => {
      if (currentUser?.role === "admin") {
        return await getAllContracts();
      }
      if (currentUser?.id) {
        return await getAllContractsClient(currentUser?.id);
      }
    };
    getContractsByUser();
  }, [currentUser, dispatch]);

  return (
    <div className="container_contract_list">
      {contracts.length > 0 ? (
        contracts.map((contract) => {
          return (
            <Contract
              key={contract.id}
              id={contract.id}
              icon={contract.icon}
              reference={contract.name}
              name={contract.name}
              status={contract.name}
            />
          );
        })
      ) : (
        <Alert type="error" message="Il n'y a pas de contrats !" />
      )}
    </div>
  );
}

export default ContractsList;
