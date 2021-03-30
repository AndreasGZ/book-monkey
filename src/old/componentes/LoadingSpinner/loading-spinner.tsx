import React, { ReactElement } from "react";

const LoadingSpinner = (): ReactElement => (
  <div className="ui container">
    <div className="ui active large text loader">Loading</div>
  </div>
);

export default LoadingSpinner;