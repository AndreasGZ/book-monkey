export default interface Book {
  isbn: string;
  title: string;
  authors: string[];
  published: Date | string;
  subtitle?: string;
  rating?: number;
  thumbnails?: Thumbnail[];
  description?: string;
}

export interface Thumbnail {
  url: string;
  title?: string;
}