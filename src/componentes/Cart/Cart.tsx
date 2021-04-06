import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../StoreContextProvider/StoreContextProvider";
import Book from "../../types/Books";
import BookListItem from "../BookListItem/BookListItem";
import CartButtons from "../CartButtons/CartButtons";


export default function Cart(): ReactElement {
  const { store: { cart } } = useStore();

  const getEveryBookOnce = (): Book[] => {
    const books: Book[] = [];
    //Jedes Buch einmal im Array speichern
    cart.forEach((book, i) => {
      let bookExists = false;
      books.forEach(el => {
        if (el.isbn === book.isbn)
          bookExists = true;
      });
      if (!bookExists) books.push(book);
    });
    return books;
  }

  // console.log(props.cart)

  const books = getEveryBookOnce();

  return (
    <div className="ui middle aligned selection divided list">
      {
        (books.length
          ?
          books.map(book => (
            <BookListItem book={book} key={book.isbn} >
              <CartButtons book={book} />
            </BookListItem>
          ))
          :
          <div className="ui item">
            <div className="ui message">
              <p className="ui content">
                Keine Bücher im Warenkorb vorhanden
              </p>
              <Link className="ui black button"
                to="/books"
              >
                Zum Bücherregal
              </Link>
            </div>
          </div>
        )
      }
    </div >
  )
}