import React from "react";

import "./_option.scss";
import { IOption } from "../../../store/contracts/contractsSlice";

const Option: React.FunctionComponent<IOption> = ({ description }) => {
  return (
    <div className="card--option">
      <span className="body-l">Hello</span>
      <span className="body-l">{description}</span>
    </div>
  );
};

export default Option;
