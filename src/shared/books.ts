import Books from "../types/Books";

const books: Books[] = [
  {
    isbn: '9783864906466',
    title: 'Angular',
    authors: ['Ferdinand Malcher', 'Johannes Hoppe', 'Danny Koppenhagen'],
    published: new Date(2019, 4, 30).toLocaleDateString(),
    subtitle: 'Grundlagen, fortgeschrittene Themen und Best Practices - mit NativeScript und NgRx',
    rating: 5,
    thumbnails: [{
      url: 'https://ng-buch.de/buch1.jpg',
      title: 'Buchcover'
    }],
    description: 'Die Autoren führen Sie mit einem anspruchsvollen Beispielprojekt durch die Welt von Angular...'
  },
  {
    isbn: '9783864903274',
    title: 'React',
    authors: ['Oliver Zeigermann', 'Nils Hartmann'],
    published: new Date(2016, 6, 17).toLocaleDateString(),
    subtitle: 'Die praktische Einführung in React, React Router und Redux',
    rating: 3,
    thumbnails: [{
      url: 'https://ng-buch.de/buch2.jpg',
      title: 'Buchcover'
    }],
    description: 'React ist ein JavaScript-Framework zur Entwicklung von Benutzeroberflächen...'
  }
]

export default books;