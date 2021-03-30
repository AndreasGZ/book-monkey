import React, { ReactElement } from "react";
import Book from "../../types/Books";
import { Actions } from "../../usereducer/store";
import Navigation from "../Navigation/Navigation";

interface Props {
  children: ReactElement;
  cart: Book[];
}

export default function Layout(props: Props): ReactElement {

  return (
    <>
      <Navigation cart={props.cart} />

      <div className="ui container">
        {props.children}
      </div>
    </>
  );
}