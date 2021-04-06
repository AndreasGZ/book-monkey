import React, { ReactElement } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Book from "../../types/Books";

interface Props {
  book: Book;
  children?: ReactElement;
}

export default function BookListItem(props: Props): ReactElement {
  const history = useHistory();
  const book = props.book;
  return (
    <>
      <Link to={`/books/${book.isbn}`} className="item">
        {/* Thumbnails.title im alt-Attribut einfügen
          Thumbnails.src im src-Attribut einügen */}
        < img className="ui tiny image"
          alt={book.thumbnails && book.thumbnails[0].title}
          src={book.thumbnails && book.thumbnails[0].url}
          onClick={() => { history.push(`/books/${book.isbn}`) }}
        />
        <div className="content">
          <div className="header">
            {/* Buchtitel ausgeben */}
            {book.title}
          </div>
          <div className="description">
            {/* Untertitel */}
            {book.subtitle}
          </div>
          <div className="metadata">
            {/* Jeden Author in ein Span-Element schreiben */}
            {
              book.authors.map((author, index) => (
                <span key={index}>
                  {author}
                  {index !== book.authors.length - 1 && `, `}
                </span>
              ))
            }
            <br />
            {/* ISBN ausgeben */}
            {book.isbn}
          </div>
        </div>
        {props.children && props.children}
      </Link >
    </>
  )
}
