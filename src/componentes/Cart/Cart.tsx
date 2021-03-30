import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import Book from "../../types/Books";
import { Actions } from "../../usereducer/store";
import BookListItem from "../BookListItem/BookListItem";
import CartButtons from "../CartButtons/CartButtons";

interface Props {
  cart: Book[];
  dispatch: React.Dispatch<Actions>;
}

export default function Cart(props: Props): ReactElement {
  const getEveryBookOnce = (): Book[] => {
    const books: Book[] = [];
    //Jedes Buch einmal im Array speichern
    props.cart.forEach((book, i) => {
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
              <CartButtons book={book} {...props} />
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