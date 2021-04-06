import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { useStore } from "../StoreContextProvider/StoreContextProvider";
import SearchBar from "../SearchBar/SearchBar";

export default function Navigation(): ReactElement {
  const { store: { cart } } = useStore();
  return (
    <nav className="ui tabular menu">
      <NavLink to="/home" className="item">Home</NavLink>
      <NavLink exact to="/books" className="item">Books</NavLink>
      <NavLink to="/books/create" className="item">Add Book</NavLink>
      <NavLink to="/cart" className="ui item label">
        <i className="shopping cart icon" />
        {cart.length}
      </NavLink>
      <SearchBar classAttr="item right" />
    </nav>
  );
}

