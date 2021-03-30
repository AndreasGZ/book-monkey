import React, { ReactElement } from "react";
import initialState from "../../shared/initialState";
import BookForm from "../BookForm/BookForm";

export default function BookCreate(): ReactElement {
  const defaultState = initialState;
  defaultState.rating = ~~(Math.random() * 6);
  return (
    <BookForm initialState={defaultState} isEdit={false} />
  );
}