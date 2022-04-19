import React from "react";

import "./_alert.scss";

export interface IAlert {
  type: String;
  message: String;
}

const Alert: React.FunctionComponent<IAlert> = ({ type, message }) => {
  return (
    <div className={`alert alert--${type}`}>
      <span className="body-s--light">{message}</span>
    </div>
  );
};

export default Alert;
