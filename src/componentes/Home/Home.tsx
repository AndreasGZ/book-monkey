import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

export default function Home(): ReactElement {
  return (
    <div className="ui center aligned header segment">
      <h1 className="ui "> Willkommen bei BookMonkey </h1>
      <Link className="ui red button" to="/books">Bücher ansehen</Link>
      <br /><br />
      <SearchBar classAttr="" />
    </div>
  );
}