import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authSelector } from "../../../store/auth/authSlice";
import {
  contractsSelector,
  setContractsSuccess,
} from "../../../store/contracts/contractsSlice";

import api from "../../../utils/api";

import Contract from "../../atoms/Contract/contract";

import "./_contractList.scss";

function ContractList() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(authSelector);
  const { contracts } = useSelector(contractsSelector);

  useEffect(() => {
    const getAllContracts = async () => {
      const contractsFetched = await api.get("/contracts");
      dispatch(setContractsSuccess(contractsFetched.data.data));
    };

    const getAllContractsClient = async (userId: string | undefined) => {
      const contractsFetched = await api.get(`/userContracts/${userId}`);
      dispatch(setContractsSuccess(contractsFetched.data.data));
    };
    const getContractsByUser = async () => {
      if (currentUser?.role === "admin") {
        return await getAllContracts();
      }
      getAllContractsClient(currentUser?.id);
    };
    getContractsByUser();
  }, [currentUser, dispatch]);

  return (
    <div className="container_responsive">
      <div className="container_contract_list">
        {contracts
          ? contracts.map((contract) => {
              return (
                <Contract
                  key={contract.id}
                  icon={contract.icon}
                  reference={contract.name}
                  name={contract.name}
                  status={contract.name}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}

export default ContractList;
