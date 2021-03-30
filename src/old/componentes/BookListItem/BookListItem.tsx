import React, { ReactElement } from "react";
import Book from "../../types/Books";

interface Props {
  book: Book;
  onShowDetails: (book_: Book) => void;
}

export default function BookListItem({ book, onShowDetails }: Props): ReactElement {
  return (
    <div className="item" onClick={() => { onShowDetails(book) }}>
      {/* Thumbnails.title im alt-Attribut einfügen
          Thumbnails.src im src-Attribut einügen */}
      <img className="ui tiny image"
        alt={book.thumbnails && book.thumbnails[0].title}
        src={book.thumbnails && book.thumbnails[0].url} />
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
    </div>
  )
}

