import React from "react";

import "./_tooltip.scss";

export interface ITooltip {
  type: String;
  message: String;
}

const Tooltip: React.FunctionComponent<ITooltip> = ({ type, message }) => {
  return (
    <div className="tooltip tooltip-error">
      <div className="tooltip-up-triangle tooltip-up-triangle--error"></div>
      <span>{message}</span>
    </div>
  );
};

export default Tooltip;
