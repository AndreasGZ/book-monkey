import React, { ReactElement } from "react";
import Navigation from "../Navigation/Navigation";

interface Props {
  children: ReactElement;
}

export default function Layout(props: Props): ReactElement {

  return (
    <>
      <Navigation />

      <div className="ui container">
        {props.children}
      </div>
    </>
  );
}