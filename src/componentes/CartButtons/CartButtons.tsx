import React, { ReactElement } from "react";
import Book from "../../types/Books";
import { Actions } from "../../usereducer/store";
import css from "./cart-buttons.module.css";

interface Props {
  cart: Book[];
  dispatch: React.Dispatch<Actions>;
  book: Book;
}

export default function CartButtons({ dispatch, cart, book }: Props): ReactElement {
  const onAddToCart = () => {
    book && dispatch({ type: "ADD_TO_CART", book })
  }

  const onRemoveFromCart = () => {
    book && dispatch({ type: "REMOVE_FROM_CART", book })
  }

  return (
    <div className={`ui extra right floated content ${css.btnContainer}`}>
      <div className="ui label">
        <i className="shopping cart icon" />
        {cart.length && cart.filter(aBook => aBook.isbn === book.isbn).length}
      </div>
      <button className="ui button" onClick={onAddToCart}>
        +
      </button>
      <button className="ui button" onClick={onRemoveFromCart}>
        -
      </button>
    </div>
  );
}