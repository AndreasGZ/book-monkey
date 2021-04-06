import React, { ReactElement } from "react";
import Book from "../../types/Books";
import LoadingSpinner from "../LoadingSpinner/loading-spinner";
import bookApi from "../../shared/BookApi";
import useBookApi from "../../hooks/useBookApi";
import { useHistory, useParams } from "react-router-dom";
import CartButtons from "../CartButtons/CartButtons";

const BookDetails = (): ReactElement => {
  const { isbn } = useParams<{ isbn: string }>();
  const history = useHistory();
  const path = `/book/${isbn}`;
  const [book] = useBookApi<Book>("get", path);
  const goToBookList = () => { history.push("/books") };
  const deleteBook = () => {
    const willBeDeleted = confirm("You are about to delete this book?");
    if (willBeDeleted) bookApi<string>("delete", path, () => { goToBookList() })
  };

  const getRatings = (): number[] => {
    const ratingArray = [];
    // Umweg über For, da ein Array mit undefined nicht gemaped wird
    if (book)
      for (let i = 0; i < (book.rating || 0); i++) {
        ratingArray.push(i)
      }
    return ratingArray;
  }

  return (
    <>
      {
        book
          ?
          <div>
            <h1>{book.title}</h1>
            <p>{book.subtitle}</p>
            <div className="ui divider"></div>
            <div className="ui grid">
              <div className="four wide column">
                <h4>Autoren</h4>
                {book.authors.map((author, index) => (
                  <p key={index}>
                    {author}
                  </p>
                ))}
              </div>
              <div className="four wide column">
                <h4>ISBN</h4>
                <p>{book.isbn}</p>
              </div>
              <div className="four wide column">
                <h4>Erschienen</h4>
                <p>{`${book.published}`}</p>
              </div>
              <div className="four wide column">
                <h4>Rating</h4>
                <p>{getRatings().map((rating, index) => (
                  <i key={index} className="yellow star icon" />
                ))}</p>
              </div>
            </div>
            <h4>Beschreibung</h4>
            <p>{book.description}</p>
            <div className="ui small images">
              {book.thumbnails && book.thumbnails.map((thumbnail, index) => (
                <img key={index} src={thumbnail.url} alt={thumbnail.title} />
              ))}
            </div>
            <button className="ui red button"
              onClick={() => { deleteBook() }}
            >
              Delete book
            </button>
            <button className="ui yellow button"
              onClick={() => { history.push(`/books/${isbn}/edit`); }}
            >
              Edit book
            </button>

            <CartButtons book={book} />

          </div>
          :
          <LoadingSpinner />
      }
      <div className="ui divider"></div>
      <button className="ui blue button" onClick={goToBookList}>
        Back
      </button>
    </>
  )
}

export default BookDetails;