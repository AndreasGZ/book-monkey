import React, { ReactElement, useState } from 'react';
import BookDetails from './componentes/BookDetails/BookDetails';
import BookList from './componentes/BookList/BookList';
// import ClassCounter from './componentes/ClassCounter/ClassCounter';
// import books from "./shared/books";
import Book from './types/Books';

//Index hat bei Listen einen Nachteil, wenn man die Liste sortieren kann 

type ViewState = "list" | "details";

function App(): ReactElement {
  // const [bookList, setBookst] = useState<Book[]>(books);
  const [book, setBook] = useState<Book>();
  const [viewState, setViewState] = useState<ViewState>("list");

  // const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   console.log(e);
  // }
  // <div onClick={onClick}></div>

  const onShowDetails = (book_: Book) => {
    setBook(book_);
    setViewState("details");
  }

  const onShowList = () => {
    setBook(undefined);
    setViewState("list");
  }

  return (
    <div className="ui container">
      {book && viewState === "details"
        ?
        <BookDetails book={book} onShowList={onShowList} />
        :
        < BookList onShowDetails={onShowDetails} />
      }
    </div>
  );
}

export default App;
