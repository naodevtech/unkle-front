import React from "react";

import { IOption } from "../../../store/contracts/contractsSlice";

import Option from "../../atoms/Option/option";

import api from "../../../utils/api";

import "./_optionsList.scss";

type OptionList = {
  contractOptions?: IOption[];
};

export const OptionsList = <PROPS extends OptionList>({
  contractOptions,
}: PROPS): JSX.Element => {
  return (
    <div className="container_option_list">
      {contractOptions
        ? contractOptions?.map((option: IOption, index: number) => {
            return (
              <Option
                key={index}
                name={option.name}
                description={option.description}
              />
            );
          })
        : null}
    </div>
  );
};
