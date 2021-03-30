/* eslint-disable indent */
import React, { ReactElement, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import useInitialState from "../../hooks/useInitialState";
import bookApi from "../../shared/BookApi";
import Book, { Thumbnail } from "../../types/Books";
import css from "./book-form.module.css";

interface Props {
  initialState: Book;
  isEdit: boolean;
}

export default function BookForm({ initialState, isEdit }: Props): ReactElement {
  const history = useHistory();
  const [
    isbn, setIsbn,
    title, setTitle,
    authors, setAuthors,
    published, setPublished,
    subtitle, setsubtitle,
    rating, setRating,
    thumbnails, setThumbnails,
    description, setDescription
  ] = useInitialState(initialState);

  const fieldNames = {
    isbn: "Isbn",
    title: "Titel",
    author: "Author",
    published: "Published",
    subtitle: "subtitle",
    thumbnails: {
      thumbnail: "Thumbnail",
      url: "url",
      title: "title"
    },
    url: "Url",
    description: "Description"
  };

  const getState = () => {
    return {
      isbn, title, authors, published, subtitle, rating, thumbnails, description
    }
  }

  const setNewState = (stateKey: string, newValue: string, index: number, key: string): void => {
    const copyAuthors: string[] = [...authors];
    let copyThumbnails: Thumbnail[];

    switch (stateKey) {
      case fieldNames.isbn:
        setIsbn(newValue);
        break;
      case fieldNames.title:
        setTitle(newValue);
        break;
      case fieldNames.author:
        copyAuthors[index] = newValue;
        setAuthors(copyAuthors);
        break;
      case fieldNames.published:
        setPublished(newValue);
        break;
      case fieldNames.subtitle:
        setsubtitle(newValue);
        break;
      case fieldNames.thumbnails.thumbnail:
        if (thumbnails) {
          copyThumbnails = [...thumbnails];
          copyThumbnails[index] = { ...copyThumbnails[index], [key]: newValue };
          setThumbnails(copyThumbnails);
        }
        break;
      case fieldNames.description:
        setDescription(newValue);
        break;
    }
  };

  const addField = (fieldName: string): void => {
    const copyAuthors: string[] = [...authors];
    let copyThumbnails: Thumbnail[];

    switch (fieldName) {
      case fieldNames.author:
        copyAuthors.push("");
        setAuthors(copyAuthors);
        break;
      case fieldNames.thumbnails.thumbnail:
        if (thumbnails) {
          copyThumbnails = [...thumbnails];
          copyThumbnails.push({ url: "", title: "" });
          setThumbnails(copyThumbnails);
        }
        break;
    }
  };

  const removeField = (fieldName: string): void => {
    const copyAuthors: string[] = [...authors];
    let copyThumbnails: Thumbnail[];
    switch (fieldName) {
      case fieldNames.author:
        if (copyAuthors.length > 1) {
          copyAuthors.pop();
          setAuthors(copyAuthors);
        }
        break;
      case fieldNames.thumbnails.thumbnail:
        if (thumbnails) {
          copyThumbnails = [...thumbnails];
          if (copyThumbnails.length > 1) {
            copyThumbnails.pop();
            setThumbnails(copyThumbnails);
          }
        }
        break;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (isEdit) {
      bookApi<string>("put", `/book/${isbn}`, () => {
        history.push(`/books/${isbn}`)
      }, getState());
    } else {
      bookApi<string>("post", "/book", () => {
        history.push("/books")
      }, getState());
    }
  };

  return (
    <form className={`ui form ${css.bookForm}`} onSubmit={(e) => { handleSubmit(e) }}>
      <label>Buchtitel </label>
      <input placeholder={fieldNames.title}
        onChange={(e) => { setNewState(fieldNames.title, e.target.value, 0, "") }}
        value={title}
        required
      />

      <label>Untertitel </label>
      <input placeholder={fieldNames.subtitle}
        onChange={(e) => { setNewState(fieldNames.subtitle, e.target.value, 0, "") }}
        value={subtitle}
      />

      <label>Isbn</label>
      <input placeholder={fieldNames.isbn}
        onChange={(e) => { setNewState(fieldNames.isbn, e.target.value, 0, "") }}
        value={isbn}
        pattern="\d{9,}"
        title="mindestens 9-stellige Zahl"
        required
        readOnly={isEdit}
      />

      <label>Erscheinungsdatum </label>
      <input placeholder={fieldNames.published} type="date"
        onChange={(e) => { setNewState(fieldNames.published, e.target.value, 0, "") }}
        value={published}
        required
      />

      <label>Authoren </label>
      <button className="ui mini button" type="button"
        onClick={() => { addField(fieldNames.author) }}
      >+</button>
      <button className="ui mini button" type="button"
        onClick={() => { removeField(fieldNames.author) }}
      >-</button>
      <div className={`fields`}>
        {authors.map((author: string, index: number) => {
          return (
            <div key={index} className="sixteen wide field">
              <input placeholder={fieldNames.author}
                onChange={(e) => {
                  setNewState(fieldNames.author, e.target.value, index, "")
                }}
                value={author}
                required
              />
            </div>
          );
        })}
      </div>

      <label>Beschreibung </label>
      <textarea placeholder={fieldNames.description}
        onChange={(e) => { setNewState(fieldNames.description, e.target.value, 0, "") }}
        value={description}
        maxLength={3000}
        minLength={5}
        title="Mindestens 5 und maximal 3000 Zeichen"
      />

      <label>Bilder </label>
      <button className="ui mini button" type="button"
        onClick={() => { addField(fieldNames.thumbnails.thumbnail) }}
      >+</button>
      <button className="ui mini button" type="button"
        onClick={() => { removeField(fieldNames.thumbnails.thumbnail) }}
      >-</button>
      { thumbnails && thumbnails.map((thumbnail: Thumbnail, index: number) => {
        return (
          <div key={index} className="field">
            <input placeholder={fieldNames.url}
              type="url"
              className="nine wide field"
              onChange={(e) => {
                setNewState(fieldNames.thumbnails.thumbnail, e.target.value, index, fieldNames.thumbnails.url)
              }}
              value={thumbnail.url}
            />
            <input placeholder={fieldNames.title} className="seven wide field"
              onChange={(e) => {
                setNewState(fieldNames.thumbnails.thumbnail, e.target.value, index, fieldNames.thumbnails.title)
              }}
              value={thumbnail.title}
            />
          </div>
        );
      })}
      <button className="ui button">Submit</button>
    </form >
  );
}