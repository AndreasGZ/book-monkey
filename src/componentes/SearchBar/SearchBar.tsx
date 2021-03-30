import axios from "axios";
import React, { ReactElement, useState } from "react";
import { useHistory } from "react-router-dom";
import debounce from "../../shared/debounce";
import initialState from "../../shared/initialState";

interface Props {
  classAttr: string
}

export default function SearchBar({ classAttr }: Props): ReactElement {
  const [results, setResults] = useState([initialState]);
  const history = useHistory();

  function onchange(value: string): void {
    value = value.trim();
    function getSearchResponse(): void {
      axios.get(`https://api3.angular-buch.com/books/search/${value}`)
        .then(response => {
          console.log(response.data);
          setResults(response.data);
        });
    }
    value ? debounce(getSearchResponse(), 500) : setResults([initialState]);
  }

  return (
    <div className={`ui search ${classAttr}`}>
      <div className="ui icon input">
        <input type="text"
          className="prompt"
          onChange={(e) => { onchange(e.target.value) }} />
        <i className="search icon" />
      </div>
      {results[0] && results[0].isbn && <div className="results transition visible">
        {results.map((book, index) => {
          return (
            <div key={index} className="result"
              onClick={() => {
                setResults([initialState]);
                history.push(`/books/${book.isbn}`);
              }} >
              { book.title}
              < p className="description" >
                {book.subtitle}
              </p>
            </div>
          )
        })}
      </div >}
    </div >
  );
}