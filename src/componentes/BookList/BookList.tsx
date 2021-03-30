import React, { ReactElement, useState, useEffect } from "react";
import Book from "../../types/Books";
import BookListItem from "../BookListItem/BookListItem";
import LoadingSpinner from "../LoadingSpinner/loading-spinner";
import bookApi from "../../shared/BookApi";
import useBookApi from "../../hooks/useBookApi";

export default function BookList(): ReactElement {
  const [books, setBooks] = useBookApi<Book[]>("get", "/books");
  const getBooks = () => { bookApi<Book[]>("get", "/books", setBooks) };
  const restoreBookList = () => { bookApi<string>("delete", "/books", getBooks) };

  if (!books) return <LoadingSpinner />

  return (
    <div className="ui middle aligned selection divided list">
      {
        (books.length
          ?
          books.map(book => (
            <BookListItem book={book} key={book.isbn} />
          ))
          :
          <div className="ui item">
            <div className="ui message">
              <p className="ui content">
                Keine Bücher im Regal vorhanden
              </p>
              <button className="ui black button"
                onClick={() => { restoreBookList() }}
              >
                Store zurücksetzen
              </button>
            </div>
          </div>
        )
      }
    </div >
  );
}
