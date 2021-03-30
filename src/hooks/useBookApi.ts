import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import bookApi from "../shared/BookApi";
import { Method } from "axios";

export default function useBookApi<T>(method: Method, path: string):
  [T | undefined, Dispatch<SetStateAction<T | undefined>>] {
  const [books, setBooks] = useState<T>();

  useEffect(() => {
    bookApi<T>(method, path, setBooks);
  }, [method, path]);

  return [books, setBooks];
}