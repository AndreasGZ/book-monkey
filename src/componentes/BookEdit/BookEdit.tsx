import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";
import useBookApi from "../../hooks/useBookApi";
import initialState from "../../shared/initialState";
import Book from "../../types/Books";
import BookForm from "../BookForm/BookForm";

export default function BookEdit(): ReactElement {
  const { isbn } = useParams<{ isbn: string }>();
  const path = `/book/${isbn}`;
  const [book] = useBookApi<Book>("get", path);
  let defaultState = initialState;

  if (book) {
    const dateArr = book.published.split(".");
    let day = dateArr.shift();
    if (Number(day) < 10) day = `0${day}`;
    let month = dateArr.shift();
    if (Number(month) < 10) month = `0${month}`;
    month && dateArr.push(month);
    day && dateArr.push(day);
    const published = dateArr.join("-");
    defaultState = { ...book };
    defaultState.published = published;
  }

  return (
    <BookForm initialState={defaultState} isEdit={true} />
  );
}