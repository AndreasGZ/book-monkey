/* eslint-disable indent */
import Book from "../types/Books";

export interface Store {
  cart: Book[]
}

export const initialStore: Store = {
  cart: []
}

interface AddToCart {
  type: "ADD_TO_CART";
  book: Book;
}

interface RemoveFromCart {
  type: "REMOVE_FROM_CART";
  book: Book;
}

export type Actions = AddToCart | RemoveFromCart;


export function reducer(store: Store, action: Actions): Store {
  //Bücher nach der ISBN-Nummer sortieren
  // store.cart.sort((a, b) => a.title.localeCompare(b.title));
  store.cart.sort((a, b) => Number(a.isbn) - Number(b.isbn));
  const index = store.cart.findIndex(book => book.isbn === action.book.isbn);

  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...store,
        cart: [...store.cart, action.book]
      }
    case "REMOVE_FROM_CART":
      return {
        ...store,
        cart: store.cart.filter((book, i) => i !== index)
      }
  }
}