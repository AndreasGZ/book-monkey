import React, { ReactElement } from "react";
import { useStore } from "../StoreContextProvider/StoreContextProvider";
import Book from "../../types/Books";
import css from "./cart-buttons.module.css";

interface Props {
  book: Book;
}

export default function CartButtons({ book }: Props): ReactElement {
  const { store: { cart }, dispatch } = useStore();

  const onAddToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    book && dispatch({ type: "ADD_TO_CART", book })
  }

  const onRemoveFromCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    book && dispatch({ type: "REMOVE_FROM_CART", book })
  }

  return (
    <div className={`ui extra right floated content ${css.btnContainer}`}>
      <div className="ui label">
        <i className="shopping cart icon" />
        {cart.length && cart.filter(aBook => aBook.isbn === book.isbn).length}
      </div>
      <button className="ui button" onClick={(e) => onAddToCart(e)}>
        +
      </button>
      <button className="ui button" onClick={(e) => onRemoveFromCart(e)}>
        -
      </button>
    </div>
  );
}