import Book from "../types/Books";

const initialState: Book = {
  isbn: "",
  title: "",
  authors: [""],
  published: "",
  subtitle: "",
  rating: 0,
  thumbnails: [{
    url: "",
    title: ""
  }],
  description: "",
};

export default initialState;