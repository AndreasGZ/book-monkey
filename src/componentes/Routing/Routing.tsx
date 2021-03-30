import React, { ReactElement } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Book from "../../types/Books";
import { Actions } from "../../usereducer/store";
import BookCreate from "../BookCreate/BookCreate";
import BookDetails from "../BookDetails/BookDetails";
import BookEdit from "../BookEdit/BookEdit";
import BookList from "../BookList/BookList";
import Cart from "../Cart/Cart";
import Home from "../Home/Home";

interface Props {
  cart: Book[];
  dispatch: React.Dispatch<Actions>;
}

export default function Routing({ cart, dispatch }: Props): ReactElement {
  return (
    <Switch>
      <Route exact path='/books/create'>
        < BookCreate />
      </Route>

      <Route path='/cart'>
        <Cart dispatch={dispatch} cart={cart} />
      </Route>

      <Route path='/books/:isbn/edit'>
        <BookEdit />
      </Route>

      <Route path='/books/:isbn'>
        <BookDetails dispatch={dispatch} cart={cart} />
      </Route>

      <Route path='/books'>
        < BookList />
      </Route>

      <Route path='/home'>
        <Home />
      </Route>

      <Route path=''>
        <Redirect to="/home" />
      </Route>
    </Switch>
  );
}