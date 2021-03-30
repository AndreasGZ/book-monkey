import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Book, { Thumbnail } from "../types/Books";

interface State {
  StateArray: [
    isbn: string,
    setIsbn: Dispatch<SetStateAction<string>>,
    title: string,
    setTitle: Dispatch<SetStateAction<string>>,
    authors: string[],
    setAuthors: Dispatch<SetStateAction<string[]>>,
    published: string,
    setPublished: Dispatch<SetStateAction<string>>,
    subtitle: string | undefined,
    setsubtitle: Dispatch<SetStateAction<string | undefined>>,
    rating: number | undefined,
    setRating: Dispatch<SetStateAction<number | undefined>>,
    thumbnails: Thumbnail[] | undefined,
    setThumbnails: Dispatch<SetStateAction<Thumbnail[] | undefined>>,
    description: string | undefined,
    setDescription: Dispatch<SetStateAction<string | undefined>>
  ]
}

export default function useInitialState(initialState: Book): State["StateArray"] {
  const [isbn, setIsbn] = useState(initialState.isbn);
  const [title, setTitle] = useState(initialState.title);
  const [authors, setAuthors] = useState(initialState.authors);
  const [published, setPublished] = useState(initialState.published);
  const [subtitle, setsubtitle] = useState(initialState.subtitle);
  const [rating, setRating] = useState(initialState.rating);
  const [thumbnails, setThumbnails] = useState(initialState.thumbnails);
  const [description, setDescription] = useState(initialState.description);

  useEffect(() => {
    setIsbn(initialState.isbn);
    setTitle(initialState.title);
    setAuthors(initialState.authors);
    setPublished(initialState.published);
    setsubtitle(initialState.subtitle);
    setRating(initialState.rating);
    setThumbnails(initialState.thumbnails);
    setDescription(initialState.description);
  }, [initialState]);

  const stateArray: State["StateArray"] = [
    isbn, setIsbn,
    title, setTitle,
    authors, setAuthors,
    published, setPublished,
    subtitle, setsubtitle,
    rating, setRating,
    thumbnails, setThumbnails,
    description, setDescription
  ]

  return stateArray;
}

